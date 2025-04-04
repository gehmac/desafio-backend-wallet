import { Module } from '@nestjs/common';
import { ConfigModule } from './_shared/config/config-module';
import { ControllersModule } from './controllers/controller-module';

@Module({
  imports: [ConfigModule, ControllersModule],
})
export class AppModule { }
