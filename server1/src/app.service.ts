import { Injectable } from '@nestjs/common';
import { StatusApp } from '@src/interfaces/app/status';

@Injectable()
export class AppService {
  getStatus(): StatusApp {
    return {
      status: 'working',
      environment: process.env.NODE_ENV,
    };
  }
}
