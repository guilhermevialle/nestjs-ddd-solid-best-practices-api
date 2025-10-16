import type { IPadRepository } from '@/interface/repositories/pad-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { PadNotFoundError } from '../error/pad-not-found.error';

export class DeletePadDTO {
  @IsString()
  @IsNotEmpty()
  id: string;
}

@Injectable()
export class DeletePad {
  constructor(
    @Inject('IPadRepository')
    private readonly padRepository: IPadRepository,
  ) {}

  async execute(dto: DeletePadDTO): Promise<void> {
    const pad = await this.padRepository.findById(dto.id);

    if (!pad) throw new PadNotFoundError(`Pad with id ${dto.id} not found`);

    await this.padRepository.delete(pad);
  }
}
