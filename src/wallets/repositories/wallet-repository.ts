import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from '../entities/wallet';

export class WalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly model: Repository<Wallet>,
  ) { }

  async create(walletData: Partial<Wallet>): Promise<Wallet> {
    const wallet = this.model.create(walletData);
    return this.model.save(wallet);
  }

  async ofUserId(userId: string): Promise<Wallet | undefined> {
    const wallet = await this.model.findOne({ where: { userId } });
    return wallet ?? undefined
  }

  async updateBalance(walletId: string, amount: number): Promise<void> {
    await this.model.createQueryBuilder()
      .update(Wallet)
      .set({
        balance: () => `balance + ${amount}`,
        updatedAt: () => 'CURRENT_TIMESTAMP'
      })
      .where('id = :id', { id: walletId })
      .execute();
  }

  async ofWalletId(walletId: string): Promise<Wallet | undefined> {
    const wallet = await this.model.findOne({ where: { id: walletId } });
    return wallet ?? undefined
  }
}