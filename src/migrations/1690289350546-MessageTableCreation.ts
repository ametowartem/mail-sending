import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class MessageTableCreation1690289350546 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'message_entity',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'time_sending',
            type: 'timestamp(0) with time zone',
            default: 'now()',
          },
          {
            name: 'sender',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'recipient',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'subject',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'message',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'error_message',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('message_entity');
  }
}
