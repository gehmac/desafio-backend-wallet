import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from './environment';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: Environment.getVar('DB_HOST'),
        port: Number(Environment.getVar('DB_PORT')),
        database: Environment.getVar('DB_DATABASE'),
        username: Environment.getVar('DB_USERNAME'),
        password: Environment.getVar('DB_PASSWORD'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: Environment.getEnvType() !== 'production',
        logging: Environment.getEnvType() === 'development',
        autoLoadEntities: true,
      }),
    }),
  ],
  providers: [],
})
export class ConfigModule { }