import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetMailParamsDto } from '../dto/get-mail.params.dto';
import { MAILGUN_PROVIDER } from '../mail.provider';
import { ConfigService } from '../../core/config.service';
import { MessageRepository } from '../repository/message.repository';
import { MessageEntity } from '../entity/message.entity';
import { MessageStatus } from '../const/message.status.enum';

@Injectable()
export class MailService {
  @Inject(MAILGUN_PROVIDER)
  private readonly client;

  @Inject()
  private readonly messageRepository: MessageRepository;

  constructor(private readonly configService: ConfigService) {}
  async sendMessage(dto: GetMailParamsDto) {
    const timeSending = new Date(
      dto.timeSending ? new Date(dto.timeSending).setSeconds(0) : undefined,
    );

    const message = new MessageEntity(
      dto.sender,
      dto.recipient,
      dto.subject,
      dto.message,
      timeSending,
    );

    await this.add(message);
  }

  async add(message: MessageEntity): Promise<void> {
    await this.messageRepository.insert(message);
  }

  async delete(id: string): Promise<void> {
    await this.messageRepository.delete(id);
  }

  async findMessagesByTimeSending(timeSending: Date): Promise<MessageEntity[]> {
    return await this.messageRepository.findMessagesByTimeSending(timeSending);
  }

  findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }

  async setStatus(
    id: string,
    status: MessageStatus,
    errorMessage?: string,
  ): Promise<void> {
    await this.messageRepository.setStatus(id, status, errorMessage);
  }
}
