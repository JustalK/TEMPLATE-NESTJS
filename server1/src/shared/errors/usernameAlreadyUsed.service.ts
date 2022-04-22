import { NotFoundService } from '@shared/errors/libs/notFound.service';

export class UsernameAlreadyUsedService extends NotFoundService {
  trigger(username: string) {
    super.trigger(`User (${username}) already exist.`);
  }
}
