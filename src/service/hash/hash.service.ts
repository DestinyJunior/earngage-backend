import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Service for hashing passwords & comparing password hash.
 */
@Injectable()
export class HashService {
  hashString(password: string) {
    return bcrypt.hash(password, 10);
  }

  compareString(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
