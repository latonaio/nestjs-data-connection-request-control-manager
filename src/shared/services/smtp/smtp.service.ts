import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

export interface SendMailAttachment {
  filename: string;
  content: string;
}

@Injectable()
export class SmtpService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async sendMail(
    toEmailAddress: string,
    subject: string,
    textBody: string,
    attachments: SendMailAttachment[] = [],
  ) {
    return await this.mailerService
      .sendMail({
        to: toEmailAddress,
        subject: subject,
        html: textBody,
        attachments: [
          ...attachments,
        ]
      });
  }
}
