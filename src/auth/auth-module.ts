import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { RefreshTokenStrategy } from './strategies/refresh-token-strategy';
import { AccessTokenStrategy } from './strategies/access-token-strateegy';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/users/service/user-service';
import { UsersModule } from 'src/users/user-module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenStrategy, AccessTokenStrategy, UserService],
  exports: [AuthService, RefreshTokenStrategy, AccessTokenStrategy, UserService]
})
export class AuthModule { }
