import { ApplicationError } from './application.error';

export class PadNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? 'Pad not found',
      errorCode: 'PAD_NOT_FOUND',
      statusCode: 404,
    });
  }
}
