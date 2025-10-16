import { Pad } from '@/domain/pad.entity';
import { IPadRepository } from '@/interface/repositories/pad-repository.interface';
import { wait } from '@/utils/wait';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryPadRepository implements IPadRepository {
  private pads: Pad[] = [];

  async save(pad: Pad): Promise<void> {
    await wait(50);
    this.pads.push(pad);
  }

  async update(pad: Pad): Promise<void> {
    await wait(50);
    const foundPad = this.pads.find((p) => p.id === pad.id);
    if (foundPad) this.pads.splice(this.pads.indexOf(foundPad), 1, pad);
  }

  async delete(pad: Pad): Promise<void> {
    await wait(50);
    this.pads = this.pads.filter((p) => p.id !== pad.id);
  }

  async findAll(): Promise<Pad[]> {
    await wait(50);
    return [...this.pads];
  }

  async findById(id: string): Promise<Pad | null> {
    await wait(50);
    const pad = this.pads.find((p) => p.id === id);
    return pad ?? null;
  }
}
