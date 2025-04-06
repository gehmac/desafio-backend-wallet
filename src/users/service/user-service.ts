import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user-repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async createUser(userData: CreateUserDto) {
    const existingUser = await this.userRepository.ofEmail(userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    return this.userRepository.create(userData);
  }

  async updateRefreshTokenHashOfId(userId: string, token: string) {
    const userData = await this.userRepository.ofId(userId);

    if (userData?.hashedRefreshToken === token) return

    return this.userRepository.updateRefreshTokenHashOfId({
      userId: userId,
      hashedRefreshToken: token,
    });
  }

  async deleteRefreshTokenHashOfId(userId: string) {
    const userData = await this.userRepository.ofId(userId);
    if (!userData?.hashedRefreshToken) return
    return this.userRepository.deleteRefreshTokenHashOfId(userId);
  }

  async getUserById(userId: string) {
    return this.userRepository.ofId(userId);
  }

  async getUserByEmail(email: string) {
    return this.userRepository.ofEmail(email);
  }
}