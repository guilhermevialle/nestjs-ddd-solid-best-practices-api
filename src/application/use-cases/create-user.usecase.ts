import { User } from '@/domain/user.entity';
import { HashService } from '@/infra/services/hash.service';
import type { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserAlreadyExistsError } from '../error/user-already-exists.error';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class CreateUserResponseDTO {
  static fromEntity(user: User): CreateUserResponseDTO {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
    };
  }
}

@Injectable()
export class CreateUser {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly hashService: HashService,
    @InjectQueue('welcome-email')
    private readonly welcomeEmailQueue: Queue,
  ) {}

  async execute(dto: CreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByUsername(
      dto.username,
    );

    if (userAlreadyExists)
      throw new UserAlreadyExistsError(
        `User with username ${dto.username} already exists`,
      );

    const passwordHash = await this.hashService.hash(dto.password);

    const user = User.create({
      username: dto.username,
      password: passwordHash,
    });

    await this.userRepository.save(user);

    await this.welcomeEmailQueue.add('send-welcome-email', {
      userId: user.id,
      username: user.username,
    });

    return user;
  }
}
