import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';

interface EmailPayLoad {
  emailRecipients: string;
  from: string | null;
  subject: string;
  text?: string;
  html?: HtmlData;
  // replyTo: string;
}

interface HtmlData {
  templateName: string;
  htmlData?: { [key: string]: string | number };
}

@Injectable()
export class EmailingService {
  private readonly sender: string;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private replaceHtmlDataContent({ templateName, htmlData }: HtmlData): string {
    let content: any;
    if (templateName) {
      content = fs.readFileSync(
        path.join(
          __dirname,
          '..',
          '..',
          `/assets/templates/${templateName}.html`,
        ),
        'utf8',
      );
      for (const key in htmlData) {
        if (htmlData.hasOwnProperty(key)) {
          const val: string | number = htmlData[key];
          content = content.replace(new RegExp(`{{${key}}}`, 'g'), val);
        }
      }

      return content;
    }
  }

  /**
   *
   * @param @object emailData {
   * @key emailRecipients: string;
     @key from: string;
     @key subject: string;
     @key text?: string;
     @key html?:{ templateName: string;
          @type htmlData: { [key: string]: string | number }
        }
    }
   */
  public async sendEmailWithTemplate(emailData: EmailPayLoad) {
    const htmlContent = this.replaceHtmlDataContent(emailData.html);
    const fromRecipient = this.configService.get('EMAIL_SENDER');

    await this.mailerService.sendMail({
      to: emailData.emailRecipients, // list of receivers
      from: emailData.from || fromRecipient, // sender address
      subject: emailData.subject, // Subject line
      text: emailData.text,
      html: htmlContent, // HTML body content
      // replyTo: 'applications@niyo.co',
    });
  }

  public async sendEmailText({
    emailRecipients,
    from,
    subject,
    text,
  }: EmailPayLoad) {
    const fromRecipient = this.configService.get('EMAIL_SENDER');

    await this.mailerService.sendMail({
      to: emailRecipients, // list of receivers
      from: from || fromRecipient, // sender address
      subject: subject, // Subject line
      text: text,
      // replyTo: 'applications@niyo.co',
    });
  }
}
