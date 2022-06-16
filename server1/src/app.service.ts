/**
 * This file manage the endpoint for the app
 * */
import { Injectable } from '@nestjs/common';
import { StatusApp } from '@interfaces/app/status';

/**
 * Service for managing endpoint of the app
 * */
@Injectable()
export class AppService {
  /**
   * Endoint for getting the status of the app
   * @return Return the status of the app
   * */
  getStatus(): StatusApp {
    return {
      status: 'working',
      environment: process.env.NODE_ENV,
    };
  }
}
