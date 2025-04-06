import { Repository } from 'typeorm';
import { User } from '../entities/user-entity';
import { InjectRepository } from '@nestjs/typeorm';


export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly model: Repository<User>,
  ) { }

  async ofEmail(email: string): Promise<User | undefined> {
    const user = await this.model.findOne({ where: { email } });
    return user ?? undefined;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.model.create(userData);
    return this.model.save(user);
  }

  async ofId(userId: string): Promise<User | undefined> {
    const user = await this.model.findOne({ where: { id: userId } });
    return user ?? undefined;
  }

  async updateRefreshTokenHashOfId({ userId, hashedRefreshToken }): Promise<void> {
    await this.model.update(
      { id: userId },
      { hashedRefreshToken },
    );
  }

  async deleteRefreshTokenHashOfId(userId: string): Promise<void> {
    await this.model.update(
      { id: userId },
      { hashedRefreshToken: '' },
    );
  }
}