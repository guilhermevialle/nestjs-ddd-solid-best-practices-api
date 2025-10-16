import { Controller, Get, Inject } from '@nestjs/common';
import type { IUserRepository } from './interface/repositories/user-repository.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  @Get()
  async getHello() {
    return (await this.userRepository.findAll()).map((user) => user.toJSON());
  }
}
