import { NotFoundService } from '@shared/errors/libs/notFound.service';

/**
 * Classe managing the error when the user does not exist
 */
export class UserNotFoundService extends NotFoundService {
  /**
   * Trigger the error
   * @param username The username of the user not found
   * */
  trigger(username: string) {
    super.trigger(`User (${username}) has not been found.`);
  }
}
