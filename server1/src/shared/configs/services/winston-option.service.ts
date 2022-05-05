import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston/dist/winston.interfaces';
import * as winston from 'winston';
import path from 'path';
import colors from 'colors';

const LOCAL_TIMESTAMP = 'en-GB';

const CODE = '[CODE]';
const PREFIXE = 'LOG';
const SPACE = ' ';
const TAB = '\t';
const DASH = ' - ';
const EMPTY = '';

const NUMERIC = 'numeric';
const DIGIT_TWO = '2-digit';

@Injectable()
export class WinstonOptionService implements WinstonModuleOptionsFactory {
  prepareColorizedFormat(information: {
    level: string;
    timestamp: string;
    filename: string;
    message: string;
    prefixe?: string;
    code?: string;
    suffixe?: string;
  }) {
    const code = colors.blue(information.code || CODE);
    const level = colors.green(information.level);
    const time = colors.white(information.timestamp);
    const prefixe = colors.green(information.prefixe || PREFIXE);
    const filename = colors.yellow(information.filename);
    const message = colors.green(information.message);
    const suffixe = colors.yellow(information.suffixe || EMPTY);
    return EMPTY.concat(
      code,
      SPACE,
      level,
      SPACE,
      DASH,
      time,
      TAB,
      SPACE,
      prefixe,
      SPACE,
      filename,
      SPACE,
      message,
      SPACE,
      suffixe,
    );
  }

  prepareDateFormat(timestamp: Date): string {
    return new Date(timestamp)
      .toLocaleDateString(LOCAL_TIMESTAMP, {
        year: NUMERIC,
        month: DIGIT_TWO,
        day: DIGIT_TWO,
        hour12: true,
        hour: NUMERIC,
        minute: NUMERIC,
        second: NUMERIC,
      })
      .toUpperCase();
  }

  prepareFilenameFormat(context: { __filename: string }): string {
    return `[${path.basename(context.__filename)}]`;
  }

  createWinstonModuleOptions():
    | Promise<WinstonModuleOptions>
    | WinstonModuleOptions {
    const nestLikeFormat = winston.format.printf(
      ({ context, level, timestamp, message }) => {
        return this.prepareColorizedFormat({
          level,
          timestamp: this.prepareDateFormat(timestamp),
          filename: this.prepareFilenameFormat(context),
          message,
        });
      },
    );

    return {
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            nestLikeFormat,
          ),
        }),
      ],
    };
  }
}
