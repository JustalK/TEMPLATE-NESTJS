import { HttpStatus, HttpException } from '@nestjs/common';

export class NotFoundService {
  trigger(message: string) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
