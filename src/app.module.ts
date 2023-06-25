import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigProviderModule } from './provider/config.provider';
import { MongoDatabaseProviderModule } from './provider/db/mongo-provider.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './error/all-exception.filter';
import { validationErrorFactory } from './error/validation-error.function';
import { NextFunction } from 'express';
import { CampaignModule } from './app/campaign/campaign.module';
import { CampaignUploadsModule } from './app/campaign-uploads/campaign-uploads.module';

@Module({
  imports: [
    ConfigProviderModule,
    MongoDatabaseProviderModule,
    CampaignModule,
    CampaignUploadsModule,
  ],
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
export class AppModule {
  /**
   * Adds the data property to the request object.
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        req['data'] = {} as any;
        next();
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
