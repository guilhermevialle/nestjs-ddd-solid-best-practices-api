import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigureModule } from './infra/configure/configure.module';
import { AuthModule } from './infra/modules/auth/auth.module';
import { UserModule } from './infra/modules/user.module';

@Module({
  imports: [ConfigureModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
