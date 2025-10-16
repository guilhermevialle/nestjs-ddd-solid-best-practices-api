import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

interface SendMailPayload {
  to: string;
  from: string;
  subject: string;
  body: string;
}

@Injectable()
export class MailService {
  constructor(private readonly mailer: MailerService) {}

  async send(payload: SendMailPayload) {
    try {
      console.log('[Email] Enviando email...');

      await this.mailer.sendMail({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.body,
      });

      console.log('[Email] Email enviado com sucesso!');
    } catch (err) {
      console.log(err);
    }
  }
}
