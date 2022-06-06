import { AppService } from '@test/libs/app.service';
import { MUTATION_SIGNING } from '@test/mutations/auth';

const test = () => {
  let appService: AppService;

  beforeAll(async () => {
    appService = new AppService();
    await appService.start();
  });

  afterAll(async () => {
    await appService.stop();
  });

  describe('[AUTH MODULE] Signing', () => {
    it('[PUBLIC] Signing with an username and a password', async () => {
      const result = await appService.query(MUTATION_SIGNING, {
        username: 'iamsogoodandsexy',
        password: 'dsf84s6d48fs',
      });
      const { data }: any = result;
      expect(data.signing.username).toBe('iamsogoodandsexy');
    });
    it('[PUBLIC] Signing with an username already taken by someone', async () => {
      const { errors } = await appService.query(MUTATION_SIGNING, {
        username: 'justalk',
        password: 'dsf84da465d4qs48fs',
      });
      expect(errors[0].message).toBe(
        'User validation failed: username: Username already taken by someone else',
      );
    });
    it('[PUBLIC] Signing with no username and password', async () => {
      const { errors } = await appService.query(MUTATION_SIGNING, {
        username: '',
        password: '',
      });
      expect(errors[0].message).toBe(
        'User validation failed: password: Path `password` is required., username: Path `username` is required.',
      );
    });
  });
};

export default test;
