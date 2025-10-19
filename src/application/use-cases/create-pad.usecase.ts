import { Pad } from '@/domain/pad.entity';
import type { IPadRepository } from '@/interface/repositories/pad-repository.interface';
import type { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { UserNotFoundError } from '../error/user-not-found.error';

export class CreatePadDTO {
  @IsString()
  @MaxLength(1000)
  content: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  expiresIn: number;
}

@Injectable()
export class CreatePad {
  constructor(
    @Inject('IPadRepository')
    private readonly padRepository: IPadRepository,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @InjectQueue('pad-expiration')
    private readonly padExpirationQueue: Queue,
  ) {}

  async execute(userId: string | null, dto: CreatePadDTO): Promise<Pad> {
    let pad: Pad;

    if (!userId) {
      pad = Pad.create({
        content: dto.content,
        expiresIn: dto.expiresIn,
        isPublic: true,
      });
    } else {
      const user = await this.userRepository.findById(userId);
      if (!user)
        throw new UserNotFoundError(`User with id ${userId} not found`);

      pad = Pad.create({
        userId: user.id,
        content: dto.content,
        isPublic: dto.isPublic,
        expiresIn: dto.expiresIn,
      });
    }

    await this.padRepository.save(pad);

    await this.padExpirationQueue.add(
      'delete-pad',
      { padId: pad.id },
      { jobId: `pad_expire-${pad.id}`, delay: pad.msUntilExpiration },
    );

    return pad;
  }
}
