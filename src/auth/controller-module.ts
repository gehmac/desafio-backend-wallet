import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [],
})
export class AuthControllerModule { }
