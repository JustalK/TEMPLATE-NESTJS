import { AppService } from '@test/libs/app.service';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
  });

  afterAll(async () => {
    await appService.stop();
  });

  describe('[LOAD TESTING] App', () => {
    it('[PUBLIC] Testing the load of the status', async () => {
      const result = await appService.queryHTTP();
      const { status, environment } = result.body;
      expect(status).toBe('working');
      expect(environment).toBe('test');
    });
  });
};

export default test;
