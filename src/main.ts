import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger, ValidationPipe ,BadRequestException } from '@nestjs/common';
import { CustomExceptionFilter } from '@shared/filters/custom-exception.filter';
import * as bodyParser from 'body-parser';
import { ValidationError } from 'class-validator';
import { TransformationInterceptor } from '@shared/interceptors/transform.interceptor';
import * as configurations from '@config/configuration';

const configuration = configurations.default();
const port = configuration.application.port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new CustomExceptionFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(validationErrors);
    },
    transform: true,
  }));
  app.enableCors();
  app.useGlobalInterceptors(new TransformationInterceptor())
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  await app.listen(port);
}
bootstrap().then(() => {
  return Logger.log(`This api server is running port ${port}`);
});
