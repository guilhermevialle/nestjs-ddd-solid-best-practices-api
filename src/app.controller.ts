import { Controller, Get, Inject } from '@nestjs/common';
import type { IPadRepository } from './interface/repositories/pad-repository.interface';
import type { IUserRepository } from './interface/repositories/user-repository.interface';

@Controller()
export class AppController {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IPadRepository')
    private readonly padRepository: IPadRepository,
  ) {}

  @Get('users')
  async getAllUsers() {
    return (await this.userRepository.findAll()).map((user) => user.toJSON());
  }

  @Get('pads')
  async getAllPads() {
    return (await this.padRepository.findAll()).map((pad) => pad.toJSON());
  }
}
