import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { TransactionRepository } from '../repositories/trasaction-repository';
import { DataSource } from 'typeorm';
import { WalletsService } from 'src/wallets/service/wallet.service';

@Injectable()
export class TransactionService {
  constructor(
    private transactionRepository: TransactionRepository,
    @Inject(forwardRef(() => WalletsService))
    private walletsService: WalletsService,
    private dataSource: DataSource
  ) { }

  async create(transactionData: {
    senderWalletId: string;
    receiverWalletId: string;
    amount: number;
    status: TransactionStatus;
    error?: string;
  }): Promise<Transaction> {
    return this.transactionRepository.create({
      senderWalletId: transactionData.senderWalletId,
      receiverWalletId: transactionData.receiverWalletId,
      amount: transactionData.amount,
      status: transactionData.status,
      ...(transactionData.error && { metadata: { error: transactionData.error } })
    });
  }

  async revertTransaction(transactionId: string): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transaction = await this.transactionRepository.ofTransactionId(transactionId);

      if (!transaction || transaction.status !== 'completed') {
        throw new Error('Transaction cannot be reverted');
      }

      await this.transactionRepository.updateStatus(transactionId, 'reverting');

      await this.walletsService.updateBalancesOnReversion(
        transaction.senderWalletId,
        transaction.receiverWalletId,
        transaction.amount
      );

      await this.transactionRepository.updateStatus(transactionId, 'reverted');

      await queryRunner.commitTransaction();
      const transactionReverted = await this.transactionRepository.ofTransactionId(transactionId);
      return transactionReverted ?? undefined;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async getUserTransactionHistory(userId: string) {
    return this.transactionRepository.getUserTransactionHistory(userId);
  }

  async getTransactionDetails(transactionId: string) {
    return this.transactionRepository.ofTransactionId(transactionId);
  }
}