import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time_sending: string;
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
    time_sending?: string,
    id?: number,
  ) {
    this.id = id;
    this.time_sending = time_sending || new Date().toLocaleString();
    this.sender = sender;
    this.recipient = recipient;
    this.subject = subject;
    this.message = message;
  }
}
