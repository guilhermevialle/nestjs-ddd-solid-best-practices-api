import { DeletePad } from '@/application/use-cases/delete-pad.usecase';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('pad-expiration')
@Injectable()
export class PadExpirationProcessor extends WorkerHost {
  private readonly logger = new Logger(PadExpirationProcessor.name);

  constructor(private readonly deletePad: DeletePad) {
    super();
  }

  async process(job: Job<{ padId: string }>) {
    const padId: string = job.data.padId;
    this.logger.log(`[Fila] Iniciando exclusão do pad ${padId}`);

    try {
      await this.deletePad.execute({
        id: padId,
      });

      this.logger.log(`[Fila] Pad ${padId} deletado com sucesso`);
    } catch (err) {
      const error = err as Error;

      this.logger.error(
        `[Fila] Falha ao deletar pad ${padId}: ${error?.message ?? err}`,
        error?.stack,
      );
      throw err;
    }
  }
}
