import { AuthService } from '@/application/services/auth.service';
import { AuthController } from '@/infra/controllers/auth.controller';
import { JwtStrategy } from '@/infra/strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared.module';
import { UserModule } from '../user.module';

@Module({
  imports: [
    UserModule,
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'DEFAULT_SECRET_KEY',
      signOptions: {
        expiresIn: 60 * 3, // 3min
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
