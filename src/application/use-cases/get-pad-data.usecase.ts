import { Pad } from '@/domain/pad.entity';
import type { IPadRepository } from '@/interface/repositories/pad-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { PadNotFoundError } from '../error/pad-not-found.error';

export class GetPadDataDTO {
  @IsNotEmpty()
  @IsString()
  id: string;
}

@Injectable()
export class GetPadData {
  constructor(
    @Inject('IPadRepository')
    private readonly padRepository: IPadRepository,
  ) {}

  async execute(dto: GetPadDataDTO): Promise<Pad> {
    const pad = await this.padRepository.findById(dto.id);

    if (!pad) throw new PadNotFoundError(`Pad with id ${dto.id} not found`);

    return pad;
  }
}
