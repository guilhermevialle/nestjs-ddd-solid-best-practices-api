import { ApplicationError } from '@/application/error/application.error';
import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch(ApplicationError)
export class ApplicationErrorFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { errorCode, message, statusCode } = exception.props;

    response.status(exception.props.statusCode).json({
      message,
      errorCode,
      statusCode,
    });
  }
}
