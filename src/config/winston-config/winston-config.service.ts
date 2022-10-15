import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';

const { json, timestamp, combine, colorize, printf, simple } = winston.format;

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): WinstonModuleOptions {
    return {
      transports: [new winston.transports.Console()],
      format: combine(
        timestamp(),
        colorize(),
        json(),
        simple(),
        printf(info => {
          return Object.keys(info).reverse().reduce((acc, key, i) => {
            if (typeof key === 'string') {
              if (i > 0) acc += ", "
              acc += `"${key}": "${info[key]}"`
            }

            return acc;
          }, '{ ') + ' }';
        })
      ),
      // defaultMeta: {
      //   applicationName: 'nestjs-data-connection-request-control-manager',
      // },
    };
  }
}
