import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { UserModel } from '@modules/users/models/user.model';
import { UsersRepository } from '@modules/users/users.repository';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'verifyMASTER' });
    const userRepository = new UsersRepository(UserModel);
    const t = await userRepository.create(
      new UserModel({
        username: 'azeaeaea',
        password: 'azeaeaeaez',
      }),
    );
    console.log(t);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
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
