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
  async findMessagesByTime(time_sending: string): Promise<MessageEntity[]> {
    return await this.messageRepository.findMessagesByTime(time_sending);
    // return this.messageRepository
    //   .createQueryBuilder('message_entity')
    //   .where('message_entity.time_sending=:time', {
    //     time: `${time_sending.getFullYear()}-${time_sending.getMonth()}-${time_sending.getDate()} ${time_sending.getHours()}:${time_sending.getMinutes()}:00`,
    //   })
    //   .getMany();
  }
}
