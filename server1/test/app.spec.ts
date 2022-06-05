import { AppService } from '@test/libs/app.service';
import { SeederService } from '@test/libs/seeder.service';
import { MUTATION_LOGIN } from '@test/libs/mutations/auth';

describe('AppController', () => {
  let appService: AppService;
  let seederService: SeederService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
    seederService = new SeederService(appService.moduleFixture);
    await seederService.seed();
  });

  afterAll(async () => {
    await appService.stop();
  });

  describe('getStatus', () => {
    it('[PUBLIC] Login with an existing user account using username and password', async () => {
      const result = await appService.query(MUTATION_LOGIN, {
        username: 'justalk',
        password: 'ezc186by',
      });
      const { data }: any = result;
      expect(data.login.username).toBe('justalk');
    });
  });
});
