import { User } from 'src/domain/user.entity';

export interface IUserRepository {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
}
