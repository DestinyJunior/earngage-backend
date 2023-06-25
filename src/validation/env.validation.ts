import { Logger, Optional } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @Optional()
  DB_HOST: string;

  @IsNumber(
    {},
    validationErrorMessage(
      'Env variable should be a valid number',
      ERROR_CODE.FIELD_INVALID,
    ),
  )
  @Optional()
  DB_PORT: number;

  @Optional()
  DB_USERNAME: string;

  @Optional()
  DB_PASSWORD: string;

  @Optional()
  DB_NAME: string;

  @IsOptional()
  DB_URL: string;

  @IsNotEmpty()
  DATABASE_URL: string;
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
