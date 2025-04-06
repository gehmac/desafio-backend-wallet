import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.controller-type";
import { AuthService } from "../service/auth.service";
import { GetCurrentUser } from "src/_shared/decorators/get-current-user";
import { AuthGuard } from "src/_shared/guards/auth.guard";

@Controller({
  path: 'auth',
  version: '1',
})

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // @Public()
  @Post('login')
  signinLocal(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@GetCurrentUser() user: any): Promise<void> {
    return this.authService.logout(user.id);
  }

  // @Post('refresh')
  // refreshTokens(
  //   // @GetCurrentUserId() userId: number,
  //   // @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<Tokens> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
