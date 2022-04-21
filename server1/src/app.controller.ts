import { Controller, Get } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { StatusApp } from '@src/interfaces/app/status';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getStatusApi(): StatusApp {
    return this.appService.getStatus();
  }
}
