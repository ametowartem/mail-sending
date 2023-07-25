import { Module } from '@nestjs/common';
import { MailService } from './service/mail.service';
import { appProviders } from './mail.provider';
import { CoreModule } from '../core/core.module';
import { MailControllerV1 } from './controller/mail.controller.v1';
import { ScheduleModule } from '@nestjs/schedule';
import { MailCronJob } from './job/mail.cron-job';
import { MessageRepository } from './repository/message.repository';

@Module({
  imports: [CoreModule, ScheduleModule.forRoot()],
  controllers: [MailControllerV1],
  providers: [MailService, ...appProviders, MailCronJob, MessageRepository],
  exports: [MailService],
})
export class MailModule {}
