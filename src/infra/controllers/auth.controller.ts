import {
  AuthenticateDTO,
  AuthService,
} from '@/application/services/auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  async authenticate(@Body() dto: AuthenticateDTO) {
    return await this.authService.authenticate(dto);
  }
}
