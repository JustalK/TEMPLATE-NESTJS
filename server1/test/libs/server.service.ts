import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

/**
 * Primary business layer
 * The service abstract class for managing the same fonction shared by whole service
 */
export class ServerService {
  mongoServer: MongoMemoryServer;
  uri: string;

  async start() {
    this.mongoServer = await MongoMemoryServer.create();
    this.uri = this.mongoServer.getUri();
    await mongoose.connect(this.uri, {
      dbName: 'verifyMASTER',
    });
  }

  async stop() {
    await mongoose.connection.close();
    await this.mongoServer.stop();
  }
}
