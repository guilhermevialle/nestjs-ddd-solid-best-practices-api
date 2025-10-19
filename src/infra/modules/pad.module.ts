import { ChangePadContent } from '@/application/use-cases/change-pad-content.usecase';
import { CreatePad } from '@/application/use-cases/create-pad.usecase';
import { DeletePad } from '@/application/use-cases/delete-pad.usecase';
import { GetPadData } from '@/application/use-cases/get-pad-data.usecase';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { PadController } from '../controllers/pad.controller';
import { InMemoryPadRepository } from '../repositories/in-memory/in-memory-pad.repository';
import { PadExpirationProcessor } from '../workers/pad-expiration.worker';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, BullModule.registerQueue({ name: 'pad-expiration' })],
  controllers: [PadController],
  providers: [
    CreatePad,
    DeletePad,
    GetPadData,
    ChangePadContent,
    PadExpirationProcessor,
    {
      provide: 'IPadRepository',
      useClass: InMemoryPadRepository,
    },
  ],
  exports: ['IPadRepository'],
})
export class PadModule {}
