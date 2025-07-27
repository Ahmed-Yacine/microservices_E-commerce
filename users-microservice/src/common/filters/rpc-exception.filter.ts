import { ArgumentsHost, Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class AllRpcExceptionsFilter implements RpcExceptionFilter<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(exception: any, host: ArgumentsHost): Observable<any> {
    const error = {
      statusCode: exception.statusCode || 500,
      message: exception.message || 'Internal server error',
      error: exception.error || 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };

    return throwError(() => new RpcException(error));
  }
}
