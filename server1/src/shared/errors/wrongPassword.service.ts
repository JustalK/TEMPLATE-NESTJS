import { BadRequestService } from '@shared/errors/libs/badRequest.service';

/**
 * Classe managing the error when the user loggin with a wrong password
 */
export class WrongPasswordService extends BadRequestService {
  /**
   * Trigger the error
   * @param username The username of the user trying to connect
   * */
  trigger(username: string) {
    super.trigger(`The password is wrong for (${username}).`);
  }
}
