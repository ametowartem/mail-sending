import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { MessageEntity } from './mail/message.entity';

dotenv.config();
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'rootroot',
  database: 'maildb',
  entities: [MessageEntity],
  migrations: ['./src/migrations/*.ts'],
});
