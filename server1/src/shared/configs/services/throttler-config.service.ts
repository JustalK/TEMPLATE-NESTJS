import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

/**
 * ThrottlerConfigService
 * Allow configuration of Throttler Service, it's used in order to rate-limit api endpoints.
 */
@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createThrottlerOptions():
    | Promise<ThrottlerModuleOptions>
    | ThrottlerModuleOptions {
    return {
      ttl: this.configService.get<number>('application.rateLimit.ttl'),
      limit: this.configService.get<number>('application.rateLimit.limit'),
    };
  }
}
