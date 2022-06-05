import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { TestService } from '@test/libs/test.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let testService: TestService;

  beforeAll(async () => {
    testService = new TestService();
    await testService.init();
    await testService.seed();
  });

  afterAll(async () => {
    await testService.stop();
  });

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  describe('getStatus', () => {
    it('should return the status of the app', async () => {
      const result = {
        status: 'working',
        environment: 'dev',
      };

      const t = await testService.query({
        query: `
          mutation {
            login(username: "justalk", password: "ezc186by") {
              username
              access_token
            }
          }`,
      });

      jest.spyOn(appService, 'getStatus').mockImplementation(() => result);

      expect(appController.getStatusApi()).toBe(result);
    });
  });
});
