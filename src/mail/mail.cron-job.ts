import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { MAILGUN_PROVIDER } from './mail.provider';
import { ConfigService } from '../core/config.service';
import { MailService } from './mail.service';
import { MessageEntity } from './message.entity';

@Injectable()
export class MailCronJob {
  private readonly logger = new Logger(MailCronJob.name);

  @Inject(MAILGUN_PROVIDER)
  private readonly client;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkMessage() {
    this.logger.debug('Called every minute');
    const exact_date = new Date(new Date().setSeconds(0));
    const messages = await this.mailService.findMessagesByTime(exact_date);

    messages.forEach((message: MessageEntity) => {
      const messageData = {
        from: message.sender || `mailgun@${this.configService.mailgunDomain}`,
        to: message.recipient,
        subject: message.subject,
        text: message.message,
      };

      this.mailService.setStatus(message.id);

      this.client.messages
        .create(this.configService.mailgunDomain, messageData)
        .then((res) => {
          this.logger.log(res);
        })
        .catch((err) => {
          this.logger.error(err);
        });
    });
  }
}
