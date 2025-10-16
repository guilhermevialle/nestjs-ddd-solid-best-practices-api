import { ApplicationError } from './application.error';

export class UserAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super({
      message: message ?? 'User already exists',
      errorCode: 'USER_ALREADY_EXISTS',
      statusCode: 400,
    });
  }
}
