import { Module } from '@nestjs/common';
import { ConfigModule } from './_shared/config/config-module';
import { ControllersModule } from './controllers/controller-module';
import { UsersModule } from './users/user-module';
import { AuthControllerModule } from './auth/auth-module';

@Module({
  imports: [ConfigModule, ControllersModule, UsersModule, AuthControllerModule],
})
export class AppModule { }
