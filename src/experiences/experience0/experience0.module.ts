import { Module } from '@nestjs/common';
import { Experience0Controller } from './experience0.controller';
import { Experience0Service } from './experience0.service';
import { Data, DataSchema } from './schema/data.schema'
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Data.name, schema: DataSchema }])],
  controllers: [Experience0Controller],
  providers: [Experience0Service],
})
export class Experience0Module {}
