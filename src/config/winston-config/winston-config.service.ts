import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  WinstonModuleOptionsFactory,
  WinstonModuleOptions,
} from 'nest-winston';
import { LogLevel } from '@shared/enums/log-level';
import * as moment from 'moment';
import 'moment-timezone';

const { json, timestamp, combine, colorize, printf, simple } = winston.format;

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  createWinstonModuleOptions(): WinstonModuleOptions {
    const timeZone = process.env.TIME_ZONE || 'Asia/Tokyo';

    return {
      transports: [new winston.transports.Console({ level: LogLevel['Debug'] })],
      format: combine(
        timestamp({ format: moment().tz(timeZone).format() }),
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
