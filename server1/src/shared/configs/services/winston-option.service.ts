import { Injectable } from '@nestjs/common';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston/dist/winston.interfaces';
import * as CONSTANTS from '@shared/constants/string';
import * as winston from 'winston';
import path from 'path';
import colors from 'colors';

/**
 * Injectable service for managing the winston logger
 */
@Injectable()
export class WinstonOptionService implements WinstonModuleOptionsFactory {
  /**
   * Transform the context to a simple filename format such as [filename]
   * @param {Object} information The information object
   * @param information.level The level of the error
   * @param information.timestamp The timestamp when the error has been called
   * @param information.filename The name where the log has been called
   * @param information.message The error message
   * @param information.prefixe The message before the message
   * @param information.code The code message
   * @param information.suffixe The message after the message
   * @return The message wrapped in the right color
   * */
  prepareColorizedFormat(information: {
    level: string;
    timestamp: string;
    filename: string;
    message: string;
    prefixe?: string;
    code?: string;
    suffixe?: string;
  }): string {
    const code = colors.blue(information.code || CONSTANTS.CODE);
    const level = colors.green(information.level);
    const time = colors.white(information.timestamp);
    const prefixe = colors.green(information.prefixe || CONSTANTS.PREFIXE);
    const filename = colors.yellow(information.filename);
    const message = colors.green(information.message);
    const suffixe = colors.yellow(information.suffixe || CONSTANTS.EMPTY);
    return CONSTANTS.EMPTY.concat(
      code,
      CONSTANTS.SPACE,
      level,
      CONSTANTS.SPACE,
      CONSTANTS.DASH,
      time,
      CONSTANTS.TAB,
      CONSTANTS.SPACE,
      prefixe,
      CONSTANTS.SPACE,
      filename,
      CONSTANTS.SPACE,
      message,
      CONSTANTS.SPACE,
      suffixe,
    );
  }

  /**
   * Transform a date to the same format as NestJS logger
   * @param {Date} timestamp The time that we want to beautify like in nestJS
   * @return {string} The new way to show the time in a beautify way
   * */
  prepareDateFormat(timestamp: Date): string {
    return new Date(timestamp)
      .toLocaleDateString(CONSTANTS.LOCAL_TIMESTAMP, {
        year: CONSTANTS.NUMERIC,
        month: CONSTANTS.DIGIT_TWO,
        day: CONSTANTS.DIGIT_TWO,
        hour12: true,
        hour: CONSTANTS.NUMERIC,
        minute: CONSTANTS.NUMERIC,
        second: CONSTANTS.NUMERIC,
      })
      .toUpperCase();
  }

  /**
   * Transform the context to a simple filename format such as [filename]
   * @param {Object} context The context containing the metadata
   * @param {string} context.__filename The path to the file
   * @return {string} The filename wrapped between brackets
   * */
  prepareFilenameFormat(context: { __filename: string }): string {
    return `[${path.basename(context.__filename)}]`;
  }

  /**
   * Create the transports for the whole application
   * @return {Object} The transport for winston
   * */
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
