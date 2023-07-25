import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { GetMailParamsDto } from '../dto/get-mail.params.dto';
import { MailService } from '../service/mail.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('v1/mail')
export class MailControllerV1 {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async sendMail(@Body() body: GetMailParamsDto) {
    await this.mailService.sendMessage(body);
  }
}
