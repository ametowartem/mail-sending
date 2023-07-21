import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { GetMailParamsDto } from './dto/get-mail.params.dto';
import { MailService } from './mail.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}
  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
  })
  sendMail(@Body() body: GetMailParamsDto) {
    this.mailService.sendMessage(body);
  }
}
