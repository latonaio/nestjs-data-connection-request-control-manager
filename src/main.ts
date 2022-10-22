import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';
import { CustomExceptionFilter } from '@shared/filters/custom-exception.filter';
import * as bodyParser from 'body-parser';

const port = process.env.APPLICATION_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new CustomExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port);
}
bootstrap().then(() => {
  return Logger.log(`This api server is running port ${port}`);
});
