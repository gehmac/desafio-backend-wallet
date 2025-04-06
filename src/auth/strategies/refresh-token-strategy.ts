import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        const token = req.cookies?.refresh_token;
        if (!token) {
          throw new UnauthorizedException('Refresh token não encontrado');
        }
        return token;
      },
      secretOrKey: "refresh_token_secret",
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token não fornecido');
    }

    return {
      ...payload,
      refreshToken
    };
  }
}