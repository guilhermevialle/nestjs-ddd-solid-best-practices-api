import { Pad } from '@/domain/pad.entity';

export interface IPadRepository {
  save(pad: Pad): Promise<void>;
  update(pad: Pad): Promise<void>;
  delete(pad: Pad): Promise<void>;
  findAll(): Promise<Pad[]>;
  findById(id: string): Promise<Pad | null>;
}
