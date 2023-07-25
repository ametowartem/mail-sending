import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { appProviders } from './mail.provider';
import { CoreModule } from '../core/core.module';
import { MailController } from './mail.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { MailCronJob } from './mail.cron-job';
import { MessageRepository } from './message.repository';

@Module({
  imports: [CoreModule, ScheduleModule.forRoot()],
  controllers: [MailController],
  providers: [MailService, ...appProviders, MailCronJob, MessageRepository],
  exports: [MailService],
})
export class MailModule {}
