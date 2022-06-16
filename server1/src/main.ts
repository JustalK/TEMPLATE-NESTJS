import 'module-alias';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import helmet from 'helmet';
import csurf from 'csurf';
import { NODE_ENV_PROD } from '@shared/constants/string';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV !== NODE_ENV_PROD) {
    app.use(helmet());
    app.use(csurf());
  }

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
