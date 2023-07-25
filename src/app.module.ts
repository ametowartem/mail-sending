import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { MailModule } from './mail/mail.module';
import { ConfigService } from './core/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './mail/message.entity';

@Module({
  imports: [
    CoreModule,
    MailModule,
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.databaseHost,
        port: configService.databasePort,
        username: configService.databaseUsername,
        password: configService.databasePassword,
        database: configService.databaseName,
        entities: [MessageEntity],
        migrations: ['src/migrations'],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
