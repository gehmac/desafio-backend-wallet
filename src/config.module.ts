import { Module } from '@nestjs/common';
import { ConfigModule } from './_shared/config/config-module';
import { ControllersModule } from './controllers/controller-module';
import { UsersModule } from './users/user-module';
import { WalletsModule } from './wallets/wallets-module';
import { TransactionModule } from './transactions/trasaction-module';
import { AuthModule } from './auth/auth-module';

@Module({
  imports: [ConfigModule,
    ControllersModule,
    UsersModule,
    AuthModule,
    WalletsModule,
    TransactionModule
  ],
})
export class AppModule { }
