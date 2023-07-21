import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { appProviders } from './mail.provider';
import { CoreModule } from '../core/core.module';
import { MailController } from './mail.controller';
import { MessageModule } from '../message/message.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [CoreModule, MessageModule, ScheduleModule.forRoot()],
  controllers: [MailController],
  providers: [MailService, ...appProviders],
  exports: [MailService],
})
export class MailModule {}
