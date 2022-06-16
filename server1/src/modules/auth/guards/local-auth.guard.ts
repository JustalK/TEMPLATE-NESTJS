import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * This file manage the local guard
 * */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
