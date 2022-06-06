import { AppService } from '@test/libs/app.service';
import { MUTATION_LOGIN } from '@test/mutations/auth';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
  });

  afterAll(async () => {
    await appService.stop();
  });

  describe('[AUTH MODULE] Login', () => {
    it('[PUBLIC] Login to an existing user account using username and password', async () => {
      const result = await appService.query(MUTATION_LOGIN, {
        username: 'justalk',
        password: 'ezc186by',
      });
      const { data }: any = result;
      expect(data.login.username).toBe('justalk');
    });
    it('[PUBLIC] Login to an existing user account using a wrong username and password', async () => {
      const result = await appService.query(MUTATION_LOGIN, {
        username: 'justalkWrong',
        password: 'ezc186by',
      });
      const { errors }: any = result;
      expect(errors[0].message).toBe('User (justalkWrong) has not been found.');
    });
    it('[PUBLIC] Login to an existing user account using a username and a wrong password', async () => {
      const result = await appService.query(MUTATION_LOGIN, {
        username: 'justalk',
        password: 'thisisawrongpassword',
      });
      const { errors }: any = result;
      expect(errors[0].message).toBe('The password is wrong for (justalk).');
    });
  });
};

export default test;
