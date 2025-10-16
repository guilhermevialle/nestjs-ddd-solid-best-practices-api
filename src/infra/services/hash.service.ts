import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    return hash(password, 10);
  }

  async verify(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
