import { NotFoundException } from '@nestjs/common';

/**
 * Classe managing the global error of document not found
 */
export class NotFoundService {
  /**
   * Trigger the error
   * @throws {NotFoundException} The document has not been found
   * */
  trigger(message: string) {
    throw new NotFoundException(message);
  }
}
