import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) { }

  sendMail(title: string) {
    const message = `Click on this Button to accept ${title}.
    <a href="${process.env.BACK_URL}/library/accept">Accept into Library</a>`;

    this.mailService.sendMail({
      from: process.env.EMAIL_HOST,
      to: process.env.EMAIL_HOST,
      subject: `WatchLibrary Confirmation`,
      text: message,
    });
  }
}
