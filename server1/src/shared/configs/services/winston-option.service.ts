import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston/dist/winston.interfaces';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';
import path from 'path';
import colors from 'colors';

@Injectable()
export class WinstonOptionService implements WinstonModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    const env = this.configService.get<string>('application.environment');

    const nestLikeFormat = winston.format.printf(
      ({ context, level, timestamp, message }) => {
        return `${colors.blue('[Code]')} ${level}  ${colors.green(
          '-',
        )} ${new Date(timestamp)
          .toLocaleDateString('en-GB', {
            // you can use undefined as first argument
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
          .toUpperCase()}\t ${colors.green('LOG')} ${colors.yellow(
          `[${path.basename(context.__filename)}]`,
        )} ${colors.green(message)}`;
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
