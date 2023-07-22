import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetMailParamsDto } from './dto/get-mail.params.dto';
import { MAILGUN_PROVIDER } from './mail.provider';
import { ConfigService } from '../core/config.service';
import { MessageEntity } from '../message/message.entity';
import { MessageService } from '../message/message.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class MailService {
  @Inject(MAILGUN_PROVIDER)
  private readonly client;
  constructor(
    private readonly configService: ConfigService,
    private readonly messageService: MessageService,
  ) {}
  private readonly logger = new Logger(MailService.name);

  async sendMessage(email: GetMailParamsDto) {
    const messageData = {
      from: email.sender || `mailgun@${this.configService.mailgunDomain}`,
      to: email.recipient,
      subject: email.subject,
      text: email.message,
    };
    const message = new MessageEntity(
      email.sender,
      email.recipient,
      email.subject,
      email.message,
      moment(new Date(email.time_sending).setSeconds(0)).unix(),
    );
    await this.messageService.add(message);
    if (!email.time_sending || email.time_sending === new Date()) {
      this.client.messages
        .create(this.configService.mailgunDomain, messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  @Cron(CronExpression.EVERY_MINUTE)
  async message_check() {
    this.logger.debug('Called every minute');
    const exact_date = moment(new Date().setSeconds(0)).unix();
    const messages = await this.messageService.findMessagesByTime(exact_date);
    messages.forEach((message) => {
      const messageData = {
        from: message.sender || `mailgun@${this.configService.mailgunDomain}`,
        to: message.recipient,
        subject: message.subject,
        text: message.message,
      };
      this.client.messages
        .create(this.configService.mailgunDomain, messageData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }
}
