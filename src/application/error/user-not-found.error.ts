import { ApplicationError } from './application.error';

export class UserNotFoundError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? 'User not found',
      errorCode: 'USER_NOT_FOUND',
      statusCode: 404,
    });
  }
}
