import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigureModule } from './infra/configure/configure.module';
import { AuthModule } from './infra/modules/auth.module';
import { BullMQModule } from './infra/modules/bullmq.module';
import { PadModule } from './infra/modules/pad.module';
import { UserModule } from './infra/modules/user.module';

@Module({
  imports: [ConfigureModule, UserModule, AuthModule, PadModule, BullMQModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
