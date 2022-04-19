import { NotFoundException } from '@nestjs/common';

export class NotFoundService {
  trigger(message: string) {
    throw new NotFoundException(message);
  }
}
