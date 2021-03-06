import 'reflect-metadata';
import 'es6-shim';
import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from '@shared/gqlThrottlerGuard.guard';
import configuration from '@shared/configs/configuration';
import { WinstonModule } from 'nest-winston';
import { WinstonOptionService } from '@shared/configs/services/winston-option.service';
import { ThrottlerConfigService } from '@shared/configs/services/throttler-config.service';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { NODE_ENV_TEST } from '@shared/constants/string';

let conditionalModules = [];
if (process.env.NODE_ENV !== NODE_ENV_TEST) {
  conditionalModules = [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:${process.env.MONGO_PORT}/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
    ),
  ];
}

@Module({
  imports: [
    ...conditionalModules,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ThrottlerConfigService,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      useClass: WinstonOptionService,
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
