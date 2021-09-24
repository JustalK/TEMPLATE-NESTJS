import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Data, DataDocument } from './schema/data.schema';

@Injectable()
export class Experience0Service {
  constructor(@InjectModel(Data.name) private dataModel: Model<DataDocument>) {}

  getHello(): Promise<Data[]> {
    return this.dataModel.find().exec();
  }
}
