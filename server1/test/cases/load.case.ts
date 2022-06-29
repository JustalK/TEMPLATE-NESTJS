import { AppService } from '@test/libs/app.service';
import { faker } from '@faker-js/faker';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
  });

  describe('[LOAD TESTING] App', () => {
    it('[PUBLIC] Testing the load of the status', async () => {
      const result = await appService.queryLoad({});
      expect(result.totalRequests).toBe(100);
      expect(result.totalErrors).toBe(0);
    });
  });

  describe.only('[LOAD TESTING] Login', () => {
    it.only('[PUBLIC] Testing the load on the login', async () => {
      const result = await appService.queryLoad({
        path: '/graphql',
        method: 'POST',
        body: `
          mutation {
            signing(username: "${faker.internet.userName()}", password: "${faker.internet.password()}") {
              username
              access_token
            }
          }
        `,
      });
      console.log(result);
      expect(result.totalRequests).toBe(100);
      expect(result.totalErrors).toBe(0);
    });
  });
};

export default test;
