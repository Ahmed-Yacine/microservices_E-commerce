import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MicroserviceExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MicroserviceExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error('Microservice exception:', exception);

    // Handle RPC exceptions from microservices
    if (exception?.error) {
      let errorData = exception.error;

      // If error is nested (wrapped twice), extract the inner error
      if (
        errorData.error &&
        typeof errorData.error === 'object' &&
        errorData.error.statusCode
      ) {
        errorData = errorData.error;
      }

      const status = errorData.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

      return response.status(status).json({
        statusCode: status,
        message: errorData.message || 'Internal server error',
        error: errorData.error || 'Internal Server Error',
        timestamp: new Date().toISOString(),
      });
    }

    // Handle timeout errors
    if (exception.message?.includes('timeout')) {
      return response.status(HttpStatus.REQUEST_TIMEOUT).json({
        statusCode: HttpStatus.REQUEST_TIMEOUT,
        message: 'Request timeout - microservice did not respond',
        error: 'Request Timeout',
        timestamp: new Date().toISOString(),
      });
    }

    // Default error response
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
      timestamp: new Date().toISOString(),
    });
  }
}
