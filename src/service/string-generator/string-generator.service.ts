import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GenerateOptions, generate } from 'randomstring';

/**
 * Service for generating random strings.
 */
@Injectable()
export class StringGeneratorService {
  private attempts = 3;
  private exists?: (code: string) => Promise<boolean>;

  setAttempts(value: number) {
    this.attempts = value;
    return this;
  }

  setExists(exists: (code: string) => Promise<boolean>) {
    this.exists = exists;
    return this;
  }

  async generate(
    options?: number | GenerateOptions,
    throwOnFailure = true,
    prefix = '',
    suffix = '',
  ): Promise<string | undefined> {
    let count = 0;
    let code: string | undefined;

    do {
      code = `${prefix}${generate(options)}${suffix}`;

      if (this.exists === undefined || (await this.exists(code))) {
        code = undefined;
      }
    } while (count++ < this.attempts && code === undefined);

    if (code === undefined && throwOnFailure) {
      throw new InternalServerErrorException('String generation failed');
    }

    return code;
  }
}
