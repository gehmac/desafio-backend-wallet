import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { v4 } from 'uuid';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly model: Repository<Transaction>,
  ) { }

  async create(transactionData: {
    senderWalletId: string;
    receiverWalletId: string;
    amount: number;
    status: TransactionStatus;
    error?: string;
  }): Promise<Transaction> {
    const transactionInfo: Transaction = {
      senderWalletId: transactionData.senderWalletId,
      receiverWalletId: transactionData.receiverWalletId,
      amount: transactionData.amount,
      status: transactionData.status,
      id: v4(),
      createdAt: new Date()
    }
    const transaction = this.model.create(transactionInfo);
    return this.model.save(transaction);;
  }

  async ofTransactionId(transactionId: string): Promise<Transaction | undefined> {
    const transaction = await this.model.findOne({
      where: { id: transactionId },
    });
    return transaction ?? undefined;
  }

  async getUserTransactionHistory(userId: string): Promise<Transaction[]> {
    const transactions = await this.model.find({
      where: { senderWalletId: userId },
      relations: ['senderWalletId', 'receiverWalletId']
    });
    return transactions;
  }

  async updateStatus(transactionId: string, status: string, metadata?: any): Promise<void> {
    await this.model.update({ id: transactionId }, { status, ...(metadata && { metadata }) });
  }
}
