import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user-entity';
import { UserService } from 'src/users/service/user-service';
import { v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from '../dto/auth-dto';
import * as argon from 'argon2';
import { LoginDto, RegisterDto } from '../controller/auth.controller-type';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async register(user: RegisterDto): Promise<any> {
    const existUser = await this.getUserInfo(user.email);
    if (existUser) throw new BadRequestException('email already exists');

    const userId = v4();

    const hashedPassword = await argon.hash(user.password);
    const newUser: User = {
      ...user, password: hashedPassword,
      id: userId,
      name: user.name,
      createdAt: new Date()
    };
    await this.usersService.createUser(newUser);
    const tokens = await this.getToken({ ...user, id: userId });
    await this.updateRtHash(newUser.id, tokens.refreshToken);
    return tokens;
  }

  private async getUserInfo(email: string): Promise<User | undefined> {
    const user = await this.usersService.getUserByEmail(email);
    return user
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.usersService.updateRefreshTokenHashOfId(userId, hash);
  }

  private async getToken(user: AuthDto) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }, {
        secret: "access_token_secret",
        expiresIn: '15m'
      }),
      this.jwtService.signAsync({
        id: user.id,
        email: user.email,
      }, {
        secret: "refresh_token_secret",
        expiresIn: '1d'
      })
    ])
    return {
      accessToken, refreshToken
    };
  }


  async validateUser(email: string, password: string): Promise<User> {
    const user: User | undefined = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(userCredential: LoginDto): Promise<any> {
    const user = await this.getUserInfo(userCredential.email);
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.password ?? '', userCredential.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getToken(user);
    await this.updateRtHash(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    await this.usersService.deleteRefreshTokenHashOfId(userId);
  }
}