import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./auth.controller-type";
import { AuthService } from "../service/auth.service";

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

  // @Post('logout')
  // logout(@GetCurrentUserId() userId: number): Promise<boolean> {
  //   return this.authService.logout(userId);
  // }

  // @UseGuards(RtGuard)
  // @Post('refresh')
  // refreshTokens(
  //   // @GetCurrentUserId() userId: number,
  //   // @GetCurrentUser('refreshToken') refreshToken: string,
  // ): Promise<Tokens> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
