import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

import logger from '@src/core/logger';
import configuration from '@cfg/configuration';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: any = configuration();

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost): unknown {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = typeof exception.getResponse === 'function'
      ? exception.getResponse()['message']
      : exception.message || exception.getResponse();

    const errorResponse = {
      success: false,
      code: status,
      error: typeof exception.getResponse === 'function' ? exception.getResponse()['error'] : exception.message,
      timestamp: new Date().toLocaleTimeString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }),
      path: request.url,
      method: request.method,
      message: message,
    };
    const user = request.user?.email || config.logger.noauth_user_mask;
    logger.error(`[${user}] ${request.method} ${request.url} ${status} - ${message}`, HttpErrorFilter.name);

    response.status(status).json(errorResponse);
    return;
  }
}
