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
import { CampaignBudgetModule } from './app/campaign-budget/campaign-budget.module';
import { WalletTransactionModule } from './app/wallet-transaction/wallet-transaction.module';
import { WalletModule } from './app/wallet/wallet.module';
import { S3StorageBucketService } from './service/storage-bucket/s3.storage-bucket.service';
import { HashService } from './service/hash/hash.service';
import { EntityMapperService } from './service/entity-mapper/entity-mapper.service';
import { AuthModule } from './app/auth/auth.module';
import { CampaignSampleVideosModule } from './campaign-sample-videos/campaign-sample-videos.module';

@Module({
  imports: [
    ConfigProviderModule,
    MongoDatabaseProviderModule,
    CampaignModule,
    CampaignUploadsModule,
    CampaignBudgetModule,
    WalletTransactionModule,
    WalletModule,
    AuthModule,
    CampaignSampleVideosModule,
    // MailerModule.forRootAsync({
    //   imports: [ConfigProviderModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     transport: {
    //       service: 'gmail',
    //       host: configService.get('EMAIL_HOST'),
    //       port: configService.get('EMAIL_PORT'),
    //       secure: true,
    //       auth: {
    //         user: configService.get('EMAIL_ID'),
    //         pass: configService.get('EMAIL_PASS'),
    //       },
    //     },
    //   }),
    // }),
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
    S3StorageBucketService,
    HashService,
    EntityMapperService,
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
