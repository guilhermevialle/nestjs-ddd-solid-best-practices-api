import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  username: string;
}

export interface AuthenticatedUser {
  id: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'DEFAULT_SECRET_KEY',
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser {
    // This object will be attached to req.user
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
