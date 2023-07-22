import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time_sending: number;
  @Column()
  sender: string;
  @Column()
  recipient: string;
  @Column()
  subject: string;
  @Column()
  message: string;

  constructor(
    sender: string,
    recipient: string,
    subject: string,
    message: string,
    time_sending?: number,
    id?: number,
  ) {
    this.id = id;
    this.time_sending = time_sending || moment().unix();
    this.sender = sender;
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
  }
}
