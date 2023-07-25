import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MessageStatus } from '../const/message.status.enum';

@Entity('message_entity')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'time_sending' })
  timeSending: Date;

  @Column()
  sender: string;

  @Column()
  recipient: string;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column()
  status: MessageStatus;

  @Column({ name: 'error_message' })
  errorMessage: string;

  constructor(
    sender: string,
    recipient: string,
    subject: string,
    message: string,
    timeSending?: Date,
    status?: MessageStatus,
    errorMessage?: string,
    id?: string,
  ) {
    this.id = id;
    this.timeSending = timeSending || new Date();
    this.sender = sender;
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
    this.errorMessage = errorMessage;
    this.status = status || MessageStatus.Pending;
  }
}
