import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
  validateSync,
} from 'class-validator';
import { ERROR_CODE } from 'src/error/error-code.constants';
import { validationErrorMessage } from 'src/error/validation-error.function';

const logger = new Logger('ENV_VALIDATION');

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'staging',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber(
    {},
    validationErrorMessage(
      'Env variable should be a valid number',
      ERROR_CODE.FIELD_INVALID,
    ),
  )
  @IsNotEmpty()
  DB_PORT: number;

  @IsNotEmpty()
  DB_USERNAME: string;

  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsNotEmpty()
  DB_NAME: string;

  @IsOptional()
  DB_URL: string;

  @IsNotEmpty()
  STRIPE_SECRET_KEY: string;

  @IsNotEmpty()
  STRIPE_WEBHOOK_KEY: string;

  @IsNotEmpty()
  @IsUrl()
  CONNECT_REFRESH_URL: string;

  @IsNotEmpty()
  @IsUrl()
  CONNECT_RETURN_URL: string;

  @IsNotEmpty()
  FLW_PUBLIC_KEY: string;

  @IsNotEmpty()
  FLW_SECRET_KEY: string;

  FLW_ENC_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    // log errors
    errors.forEach((element) => {
      logger.error(`${Object.values(element.constraints)[0]}`);
    });

    throw new Error('Env validation failed');
  }

  return validatedConfig;
}
