import { Pad } from '@/domain/pad.entity';
import type { IPadRepository } from '@/interface/repositories/pad-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IsString, MaxLength } from 'class-validator';
import { PadNotFoundError } from '../error/pad-not-found.error';

export class ChangePadContentDTO {
  @IsString()
  @MaxLength(1000)
  content: string;
}

@Injectable()
export class ChangePadContent {
  constructor(
    @Inject('IPadRepository')
    private readonly padRepository: IPadRepository,
  ) {}

  async execute(padId: string, dto: ChangePadContentDTO): Promise<Pad> {
    const pad = await this.padRepository.findById(padId);

    if (!pad) throw new PadNotFoundError(`Pad with id ${padId} not found`);

    pad.changeContent(dto.content);

    await this.padRepository.update(pad);

    return pad;
  }
}
