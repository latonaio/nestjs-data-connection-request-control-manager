import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { CustomExceptionFilter } from '@shared/filters/custom-exception.filter';

const port = process.env.APPLICATION_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new CustomExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));

  await app.listen(port);
}
bootstrap().then(() => {
  return Logger.log(`This api server is running port ${port}`);
});
