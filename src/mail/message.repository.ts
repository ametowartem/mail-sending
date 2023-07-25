import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }

  async isLessOrEqualThan(timeSending: Date): Promise<MessageEntity[]> {
    return this.createQueryBuilder('message_entity')
      .where('message_entity.time_sending <= :time_sending', {
        time_sending: timeSending,
      })
      .andWhere('message_entity.status = :status', { status: 'Pending' })
      .getMany();
  }

  async setStatus(id: string): Promise<void> {
    await this.createQueryBuilder()
      .update(MessageEntity)
      .set({ status: 'Send' })
      .where('id = :id', { id: id })
      .execute();
  }
}
