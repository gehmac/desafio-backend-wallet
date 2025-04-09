import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/_shared/guards/auth.guard';
import { GetCurrentUser } from 'src/_shared/decorators/get-current-user';
import { WalletsService } from '../service/wallet.service';
import { TransferDto } from 'src/transactions/dto/transfer.dto';

@UseGuards(AuthGuard)
@Controller({
  path: 'wallet',
  version: '1',
})
export class WalletsController {
  constructor(private walletsService: WalletsService) { }

  @Get('my')
  async createWallet(@GetCurrentUser() user: any) {
    return this.walletsService.getOrCreateWallet(user.id);
  }

  @Get('balance')
  async getBalance(@GetCurrentUser() user: any) {
    return this.walletsService.getWalletBalance(user.id);
  }

  @Post('transfer')
  async transferFunds(
    @Body() transferDto: TransferDto,
  ) {
    return this.walletsService.transferFunds({
      senderId: transferDto.senderId,
      receiverId: transferDto.receiverId,
      amount: transferDto.amount,
    });
  }
}