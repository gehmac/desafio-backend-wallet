// import {
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UserService } from 'src/users/service/user-service';

// export class AuthGuard implements CanActivate {
//   @Inject()
//   private readonly jwtService: JwtService;
//   @Inject()
//   private readonly usersService: UserService;

//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const authHeader = request.headers['authorization'];
//     const token = authHeader.split(' ')[1];

//     if (!token) throw new UnauthorizedException();

//     try {
//       const tokenPayload = await this.jwtService.verifyAsync(token, {
//         secret: process.env.JWT_SECRET,
//       });

//       const user = await this.usersService.getUserByEmail(
//         tokenPayload.email,
//       );

//       if (!user) throw new UnauthorizedException();

//       // request.user = {
//       //   userId: user.userId,
//       //   username: user.username,
//       // };
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException(error);
//     }
//   }
// }
