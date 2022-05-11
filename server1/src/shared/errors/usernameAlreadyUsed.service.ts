import { NotFoundService } from '@shared/errors/libs/notFound.service';

/**
 * Classe managing the error when the user already exists
 */
export class UsernameAlreadyUsedService extends NotFoundService {
  /**
   * Trigger the error
   * @param username The username of the user already present in the db
   * */
  trigger(username: string) {
    super.trigger(`User (${username}) already exist.`);
  }
}
