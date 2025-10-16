import { ChangeUserProfileData } from '@/application/use-cases/change-user-profile-data.usecase';
import { CreateUser } from '@/application/use-cases/create-user.usecase';
import { GetUserProfileData } from '@/application/use-cases/get-user-profile-data.usecase';
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { InMemoryUserRepository } from '../repositories/in-memory/in-memory-user.repository';
import { SharedModule } from './shared.module';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: InMemoryUserRepository,
    },
    CreateUser,
    GetUserProfileData,
    ChangeUserProfileData,
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
