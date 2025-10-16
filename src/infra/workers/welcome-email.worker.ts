import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailService } from '../services/mail.service';

@Processor('welcome-email')
export class WelcomeEmailProcessor extends WorkerHost {
  constructor(private readonly mailService: MailService) {
    super();
  }

  async process(job: Job<{ userId: string; username: string }>): Promise<void> {
    const userId = job.data.userId;

    console.log(
      `[Fila] Enviando email de boas vindas para o usuário ${userId}`,
    );

    await this.mailService.send({
      from: '<no-reply>admin@myapp.com',
      to: `user-${userId}@myapp.com`,
      subject: 'Welcome to the platform',
      body: `Hello ${job.data.username}, welcome to the platform`,
    });
  }
}
