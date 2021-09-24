import { Controller, Get } from '@nestjs/common';
import { Experience0Service } from './experience0.service';
import { Data } from './schema/data.schema';

@Controller('experience0')
export class Experience0Controller {
  constructor(private readonly appService: Experience0Service) {}

  @Get()
  getHello(): Promise<Data[]> {
    return this.appService.getHello();
  }
}
