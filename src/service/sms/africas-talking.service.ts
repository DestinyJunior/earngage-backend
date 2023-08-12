import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AfricaTalkingSmsService {
  private readonly sender: string;

  constructor(private readonly configService: ConfigService) {}
}
