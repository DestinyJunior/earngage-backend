// import fs from 'fs';
// import path from 'path';
// import * as nodemailer from 'nodemailer';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class NodemailerService {
//   constructor(private readonly configService: ConfigService) {}
//   createTransport() {
//     return {
//       transporter: nodemailer.createTransport({
//         service: 'gmail',
//         host: this.configService.get('EMAIL_HOST'),
//         port: this.configService.get('EMAIL_PORT'),
//         secure: true, // true for 465, false for other ports like 587
//         auth: {
//           user: this.configService.get('EMAIL_ID'),
//           pass: this.configService.get('EMAIL_PASS'),
//         },
//         tls: {
//           rejectUnauthorized: false,
//         },
//       }),

//       helperOptions: (
//         email: string,
//         subject: string,
//         text?: string,
//         templateName?: string,
//         data?: { [key: string]: string | number },
//         attachments?: {
//           filename: string;
//           path?: string;
//           content?: string;
//           contentType?: string;
//         }[],
//       ) => {
//         let content: any;
//         if (templateName) {
//           content = fs.readFileSync(
//             path.join(
//               __dirname,
//               `./../../src/emailTemplates/${templateName}.html`,
//             ),
//             'utf8',
//           );
//           // content = content.replace(
//           //   new RegExp('{termsAndPrivacyUrl}', 'g'),
//           //   `${frontUrl}privacy-policy`,
//           // );
//           for (const key in data) {
//             if (data.hasOwnProperty(key)) {
//               const val: string | number = data[key];
//               content = content.replace(new RegExp(`{${key}}`, 'g'), val);
//             }
//           }
//         }

//         return {
//           from: this.configService.get(''),
//           to: email,
//           subject: subject,
//           text: text,
//           html: content,
//           attachments: attachments,
//         };
//       },
//     };
//   }
// }

// // export default new NodemailerService().createTransport();
