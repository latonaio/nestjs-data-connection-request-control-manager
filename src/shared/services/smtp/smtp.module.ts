import { Module } from '@nestjs/common';
import { ConfigModule } from '@config/config.module';
import { ConfigModule as NestConfigModule } from '@nestjs/config/dist/config.module';
import configuration from '@config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';
import * as configurations from '@config/configuration';
import { SmtpService } from './smtp.service';

const config = configurations.default();

@Module({
  imports: [
    ConfigModule,
    NestConfigModule.forRoot({
      load: [configuration],
    }),
    MailerModule.forRoot({
      transport: {
        host: config.email.host,
        secure: config.email.secure,
        auth: {
          user: config.email.auth.user,
          pass: config.email.auth.pass,
        },
      },
      defaults: {
        from: config.email.from,
      },
    }),
  ],
  providers: [SmtpService],
  exports: [SmtpService],
})
export class SmtpModule {}
