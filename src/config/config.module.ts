import { Global, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { WinstonConfigService } from '@config/winston-config/winston-config.service';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  providers: [WinstonConfigService],
  exports: [WinstonConfigService],
})
export class ConfigModule {}
