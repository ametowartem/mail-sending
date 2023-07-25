import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetMailParamsDto } from './dto/get-mail.params.dto';
import { MAILGUN_PROVIDER } from './mail.provider';
import { ConfigService } from '../core/config.service';
import { MessageRepository } from './message.repository';
import { MessageEntity } from './message.entity';

@Injectable()
export class MailService {
  @Inject(MAILGUN_PROVIDER)
  private readonly client;

  @Inject()
  private readonly messageRepository: MessageRepository;

  constructor(private readonly configService: ConfigService) {}

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
      new Date(new Date(email.timeSending).setSeconds(0)) || new Date(),
    );

    await this.add(message);

    if (!email.timeSending || email.timeSending === new Date()) {
      this.client.messages
        .create(this.configService.mailgunDomain, messageData)
        .then((res) => {
          this.logger.log(res);
        })
        .catch((err) => {
          this.logger.error(err);
        });
    }
  }

  async add(message: MessageEntity): Promise<void> {
    await this.messageRepository.insert(message);
  }

  async delete(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async findMessagesByTime(timeSending: Date): Promise<MessageEntity[]> {
    return await this.messageRepository.isLessOrEqualThan(timeSending);
  }

  findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }

  async setStatus(id: string): Promise<void> {
    await this.messageRepository.setStatus(id);
  }
}
