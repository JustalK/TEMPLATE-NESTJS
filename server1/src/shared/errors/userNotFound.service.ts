import { NotFoundService } from './libs/notFound.service';

export class UserNotFoundService extends NotFoundService {
  trigger(username: string) {
    super.trigger(`User (${username}) has not been found.`);
  }
}
