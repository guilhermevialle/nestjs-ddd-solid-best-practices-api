import { IUserRepository } from '@/interface/repositories/user-repository.interface';
import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/user.entity';
import { wait } from 'src/utils/wait';

@Injectable()
export class InMemoryUserRepository implements IUserRepository {
  private users: User[] = [
    User.create({
      username: 'guilherme.viale',
      password: 'senha123',
    }),
  ];

  async update(user: User): Promise<void> {
    await wait(50);
    const foundUser = this.users.find((u) => u.id === user.id);
    if (foundUser) this.users.splice(this.users.indexOf(foundUser), 1, user);
  }

  async findAll(): Promise<User[]> {
    await wait(50);
    return [...this.users];
  }

  async delete(user: User): Promise<void> {
    await wait(50);
    this.users = this.users.filter((u) => u.id !== user.id);
  }

  async findByUsername(username: string): Promise<User | null> {
    const found = this.users.find((user) => user.username === username);
    await wait(50);
    return found ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const found = this.users.find((user) => user.id === id);
    await wait(50);
    return found ?? null;
  }

  async save(user: User): Promise<void> {
    await wait(50);
    this.users.push(user);
  }
}
