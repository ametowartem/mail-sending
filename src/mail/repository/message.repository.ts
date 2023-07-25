import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from '../entity/message.entity';
import { MessageStatus } from '../const/message.status.enum';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }

  async findMessagesByTimeSending(timeSending: Date): Promise<MessageEntity[]> {
    return this.createQueryBuilder('message_entity')
      .where('message_entity.time_sending <= :time_sending', {
        time_sending: timeSending,
      })
      .andWhere('message_entity.status = :status', {
        status: MessageStatus.Pending,
      })
      .getMany();
  }

  async setStatus(
    id: string,
    status: MessageStatus,
    errorMessage?: string,
  ): Promise<void> {
    await this.createQueryBuilder()
      .update(MessageEntity)
      .set({ status, errorMessage })
      .where('id = :id', { id })
      .execute();
  }
}
