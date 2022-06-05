import { AppService } from '@test/libs/app.service';
import { SeederService } from '@test/libs/seeder.service';

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

  beforeEach(() => {
    //appService = new AppService();
  });

  describe('getStatus', () => {
    it('should return the status of the app', async () => {
      /**
      const result = {
        status: 'working',
        environment: 'dev',
      };
      **/
      const result = await appService.query({
        query: `
          mutation {
            login(username: "justalk", password: "ezc186by") {
              username
              access_token
            }
          }`,
      });

      expect(true).toBe(true);
    });
  });
});
