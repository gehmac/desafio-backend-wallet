import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token-strateegy';
import { UserService } from 'src/users/service/user-service';

export class AuthGuard implements CanActivate {
  @Inject()
  private readonly accessTokenStrategy: AccessTokenStrategy;
  @Inject()
  private readonly usersService: UserService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    try {
      const tokenPayload = await this.accessTokenStrategy.validate(token);

      const user = await this.usersService.getUserByEmail(
        tokenPayload.email,
      );

      if (!user) throw new UnauthorizedException();

      request.user = {
        id: user.id,
        email: user.email,
        name: user.name
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
