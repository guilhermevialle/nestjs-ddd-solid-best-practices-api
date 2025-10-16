import type { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserNotFoundError } from '../error/user-not-found.error';

export class GetUserProfileDataDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

@Injectable()
export class GetUserProfileData {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: GetUserProfileDataDTO) {
    const user = await this.userRepository.findById(dto.id);

    if (!user) throw new UserNotFoundError(`User with id ${dto.id} not found`);

    return user.profile;
  }
}
