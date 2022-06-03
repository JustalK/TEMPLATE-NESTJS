import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
  });

  afterAll(async () => {
    await mongod.stop();
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
      jest.spyOn(appService, 'getStatus').mockImplementation(() => result);

      expect(appController.getStatusApi()).toBe(result);
    });
  });
});
