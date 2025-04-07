import { forwardRef, Module } from "@nestjs/common";
import { WalletsService } from "./service/wallet.service";
import { WalletRepository } from "./repositories/wallet-repository";
import { Wallet } from "./entities/wallet";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionModule } from "src/transactions/trasaction-module";
import { WalletsController } from "./controller/wallet-controller";
import { AuthModule } from "src/auth/auth-module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Wallet]),
    forwardRef(() => TransactionModule),
    AuthModule
  ],
  controllers: [WalletsController],
  providers: [WalletsService, WalletRepository],
  exports: [WalletsService, WalletRepository],
})
export class WalletsModule { }