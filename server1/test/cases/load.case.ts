import { AppService } from '@test/libs/app.service';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
  });

  describe('[APP MODULE] Status', () => {
    it.only('[PUBLIC] Login to an existing user account using username and password', async () => {
      const result = await appService.queryLoad('http://api.server1.net');
      expect(result.totalRequests).toBe(100);
      expect(result.totalErrors).toBe(0);
    });
  });
};

export default test;
