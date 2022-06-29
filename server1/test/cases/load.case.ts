import { AppService } from '@test/libs/app.service';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
  });

  describe('[LOAD TESTING] App', () => {
    it.only('[PUBLIC] Testing the load of the status', async () => {
      const result = await appService.queryLoad();
      expect(result.totalRequests).toBe(100);
      expect(result.totalErrors).toBe(0);
    });
  });
};

export default test;
