import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { WalletRepository } from "../repositories/wallet-repository";
import { TransferDto } from "src/transactions/dto/transfer.dto";
import { DataSource } from "typeorm";
import { TransactionService } from "src/transactions/service/transactions.service";
import { Transaction, TransactionStatus } from "src/transactions/entities/transaction.entity";


@Injectable()
export class WalletsService {
  constructor(
    private dataSource: DataSource,
    private walletRepository: WalletRepository,
    @Inject(forwardRef(() => TransactionService))
    private transactionService: TransactionService
  ) { }

  async getOrCreateWallet(userId: string) {
    let wallet = await this.walletRepository.ofUserId(userId);
    if (!wallet) {
      wallet = await this.walletRepository.create({ userId });
    }
    return wallet;
  }

  async transferFunds(transferDto: TransferDto): Promise<Transaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { senderId, receiverId, amount } = transferDto;

      const senderWallet = await this.walletRepository.ofUserId(senderId);
      const receiverWallet = await this.walletRepository.ofUserId(receiverId);

      if (!senderWallet || !receiverWallet) {
        throw new NotFoundException('One or both wallets not found');
      }

      if (senderWallet.balance < amount) {
        throw new Error('Insufficient funds');
      }

      await this.walletRepository.updateBalance(senderWallet.id, -amount);
      await this.walletRepository.updateBalance(receiverWallet.id, amount);

      const transaction = await this.transactionService.create({
        senderWalletId: senderWallet.id,
        receiverWalletId: receiverWallet.id,
        amount,
        status: TransactionStatus.COMPLETED
      });

      await queryRunner.commitTransaction();
      return transaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await this.transactionService.create({
        senderWalletId: transferDto.senderId,
        receiverWalletId: transferDto.receiverId,
        amount: transferDto.amount,
        status: TransactionStatus.FAILED,
        error: error.message
      });
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUserTransactions(userId: string) {
    return this.transactionService.getTransactionDetails(userId);
  }

  async getWalletBalance(userId: string) {
    const wallet = await this.walletRepository.ofUserId(userId);
    return { balance: wallet?.balance };
  }

  async getUserBalance(walletId: string, userId: string) {
    const wallet = (await this.walletRepository.ofWalletId(walletId));
    if (wallet?.userId !== userId) throw new NotFoundException('Wallet not found');
    return { balance: wallet?.balance };
  }
}