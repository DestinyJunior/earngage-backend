import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Service for hashing passwords & comparing password hash.
 */
@Injectable()
export class HashService {
  hashString(payload: string) {
    return bcrypt.hash(payload, 10);
  }

  compareString(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
