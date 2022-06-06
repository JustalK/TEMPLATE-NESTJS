import { BadRequestException } from '@nestjs/common';

/**
 * Classe managing the global error of bad request
 */
export class BadRequestService {
  /**
   * Trigger the error
   * @throws {BadRequestException} The document has a bad request
   * */
  trigger(message: string) {
    throw new BadRequestException(message);
  }
}
