import { HashService } from '@/infra/services/hash.service';
import type { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserNotFoundError } from '../error/user-not-found.error';

export class AuthenticateDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate(dto: AuthenticateDTO) {
    const user = await this.userRepository.findByUsername(dto.username);

    if (!user)
      throw new UserNotFoundError(
        `User with username ${dto.username} not found`,
      );

    const isPasswordValid = await this.hashService.verify(
      dto.password,
      user.password,
    );

    if (!isPasswordValid) throw new Error('Invalid credentials');

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '3m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      user: {
        id: user.id,
        username: user.username,
      },
      auth: {
        accessToken,
        refreshToken,
      },
    };
  }
}
