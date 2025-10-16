import { User } from '@/domain/user.entity';
import type { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';
import { UserNotFoundError } from '../error/user-not-found.error';

export class ChangeUserProfileDataDTO {
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  summary?: string;
}

export class ChangeUserProfileDataResponseDTO {
  static fromEntity(user: User) {
    return {
      displayName: user.profile?.displayName,
      summary: user.profile?.summary,
    };
  }
}

@Injectable()
export class ChangeUserProfileData {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(userId: string, dto: ChangeUserProfileDataDTO): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) throw new UserNotFoundError(`User with id ${userId} not found`);

    user.changeProfileData(dto);

    await this.userRepository.update(user);

    return user;
  }
}
