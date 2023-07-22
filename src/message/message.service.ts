import { Inject, Injectable } from '@nestjs/common';
import { MessageEntity } from './message.entity';
import { MessageRepository } from './message.repository';

@Injectable()
export class MessageService {
  @Inject()
  private readonly messageRepository: MessageRepository;
  async add(message: MessageEntity): Promise<void> {
    await this.messageRepository.insert(message);
  }
  async delete(id: number): Promise<void> {
    await this.messageRepository.delete(id);
  }
  async findMessagesByTime(time_sending: number): Promise<MessageEntity[]> {
    return await this.messageRepository.findMessagesByTime(time_sending);
  }
  findAll(): Promise<MessageEntity[]> {
    return this.messageRepository.find();
  }
}
