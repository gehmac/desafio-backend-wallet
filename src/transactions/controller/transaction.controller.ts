import { Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/_shared/guards/auth.guard";
import { TransactionService } from "../service/transactions.service";
import { GetCurrentUser } from "src/_shared/decorators/get-current-user";

@UseGuards(AuthGuard)
@Controller({
  path: 'transaction',
  version: '1',
})
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) { }

  @UseGuards()
  // TODO: add role guard =and apikey guard
  @Post('revert/:id')
  async revertTransaction(@Param('id') id: string) {
    return this.transactionService.revertTransaction(id);
  }

  @Get(':id')
  async getTransaction(@Param('id') id: string) {
    return this.transactionService.getTransactionDetails(id);
  }

  @Get('history/my')
  async getMyTransactions(@GetCurrentUser() user: any) {
    return this.transactionService.getUserTransactionHistory(user.id);
  }
}