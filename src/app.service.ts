import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerHello(): Record<string, string> {
    return {
      AppName: 'Earngage Api',
      Version: '0.1',
      Documentation: 'api/docs',
    };
  }
}
