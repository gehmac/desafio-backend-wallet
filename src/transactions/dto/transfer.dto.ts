import { IsUUID, IsNumber, Min } from 'class-validator';

export class TransferDto {
  @IsUUID()
  senderId: string;

  @IsUUID()
  receiverId: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}