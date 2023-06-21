import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Service for hashing passwords & comparing password hash.
 */
@Injectable()
export class HashService {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
