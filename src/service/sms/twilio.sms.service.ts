import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as twilio from 'twilio';
import { MessageListInstanceCreateOptions } from 'twilio/lib/rest/api/v2010/account/message';

@Injectable()
export class TwilioSmsService {
  private readonly client: any;
  private readonly sender: string;

  constructor(private readonly configService: ConfigService) {
    const accountSid: string = this.configService.get('TW_SID');
    const token: string = this.configService.get('TW_AUTH_TOKEN');
    this.sender = this.configService.get('TW_PHONE');

    this.client = twilio(accountSid, token);
  }

  public async sendSms(smsData: { to: string; body: string }) {
    // send sms
    const msgData: MessageListInstanceCreateOptions = {
      from: this.sender,
      ...smsData,
    };

    // response
    this.client.messages.create(msgData, (err: Error, result: any) => {
      console.log(err);
      console.log('Created message using callback');
      console.log(result.sid);
    });
  }
}
