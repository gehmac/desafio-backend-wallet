import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionService } from "./service/transactions.service";
import { TransactionRepository } from "./repositories/trasaction-repository";
import { Transaction } from "./entities/transaction.entity";
import { WalletsModule } from "src/wallets/wallets-module";
import { TransactionsController } from "./controller/transaction.controller";
import { AuthModule } from "src/auth/auth-module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => WalletsModule),
    AuthModule
  ],
  controllers: [TransactionsController],
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService, TransactionRepository],
})
export class TransactionModule { }