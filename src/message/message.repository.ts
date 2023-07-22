import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MessageEntity } from './message.entity';

@Injectable()
export class MessageRepository extends Repository<MessageEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(MessageEntity, dataSource.createEntityManager());
  }
  async findMessagesByTime(time_sending: number): Promise<MessageEntity[]> {
    return this.find({ where: { time_sending: time_sending } });
    // return this.query(
    //   `select time_sending from message_entity where message_entity.time_sending = ${time_sending}`,
    // );
  }
}
