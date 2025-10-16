import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context) as boolean | Promise<boolean>;
  }

  handleRequest<TUser = any>(err: any, user: TUser, info: any): TUser | null {
    if (err || info) {
      return null;
    }

    return user;
  }
}
