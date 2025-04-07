import {
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/service/user-service';
import * as jwt from 'jsonwebtoken';

export class AuthGuard implements CanActivate {
  @Inject()
  private readonly usersService: UserService;

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) throw new UnauthorizedException();

    try {
      const tokenPayload = jwt.verify(token, 'access_token_secret') as any;

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
