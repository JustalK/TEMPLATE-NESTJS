import { AppService } from '@test/libs/app.service';
import { MUTATION_LOGIN } from '@test/mutations/auth';

export const authTest = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
  });

  afterAll(async () => {
    await appService.stop();
  });

  describe('[AUTH MODULE]', () => {
    it('[PUBLIC] Login with an existing user account using username and password', async () => {
      const result = await appService.query(MUTATION_LOGIN, {
        username: 'justalk',
        password: 'ezc186by',
      });
      const { data }: any = result;
      expect(data.login.username).toBe('justalk');
    });
  });
};
