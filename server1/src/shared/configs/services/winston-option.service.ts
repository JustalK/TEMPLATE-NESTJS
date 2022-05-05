import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston/dist/winston.interfaces';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import path from 'path';

@Injectable()
export class WinstonOptionService implements WinstonModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    const env = this.configService.get<string>('application.environment');
    const myFormatter = winston.format((info) => {
      const { message, context } = info;
      const filename = path.basename(context.__filename);

      info.message = '       LOOOOOOOOOOOOOL';
      info.level = String(5697);
      info.context = filename;
      return info;
    })();

    const nestLikeFormat = winston.format.printf(
      ({ context, level, timestamp, message }) => {
        return `${level}: ${new Date(
          timestamp,
        ).toLocaleString()}\t [context] ${message}`;
      },
    );

    return {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp({
              format: 'DD/MM/YYYY hh:mm:ss A',
            }),
            nestLikeFormat,
          ),
        }),
      ],
    };
  }
}
