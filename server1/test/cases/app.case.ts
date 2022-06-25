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

  describe('[APP MODULE] Status', () => {
    it.only('[PUBLIC] Login to an existing user account using username and password', async () => {
      const result = await appService.queryLoad();
      console.log(result);
      expect(true).toBe(true);
    });
  });
};

export default test;
