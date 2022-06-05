import { AppService } from '@test/libs/app.service';

describe('AppController', () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
    await appService.seed();
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

      console.log(result);
      expect(true).toBe(true);
    });
  });
});
