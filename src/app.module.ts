import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProviderModule } from './provider/config.provider';
import { MongoDatabaseProviderModule } from './provider/db/mongo-provider.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './error/all-exception.filter';
import { validationErrorFactory } from './error/validation-error.function';

@Module({
  imports: [ConfigProviderModule, MongoDatabaseProviderModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          whitelist: true,
          transform: true,
          stopAtFirstError: true,
          forbidNonWhitelisted: true,
          exceptionFactory: validationErrorFactory,
        }),
    },
  ],
})
export class AppModule {}
