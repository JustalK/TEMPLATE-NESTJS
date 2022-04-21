import 'module-alias';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(helmet());
  app.enableCors();
  //app.use(csurf());
  await app.listen(3000);
}
bootstrap();
