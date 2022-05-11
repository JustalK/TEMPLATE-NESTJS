import { Controller, Get } from '@nestjs/common';
import { AppService } from '@src/app.service';
import { StatusApp } from '@interfaces/app/status';

/**
 * Controller of the whole app
 * Regroup the rest call for calling global endpoint
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Check if the app is actually running
   * @return The status of the app
   * */
  @Get()
  getStatusApi(): StatusApp {
    return this.appService.getStatus();
  }
}
