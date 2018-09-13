import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException } from '@nestjs/common';

@Catch(UnauthorizedException)
export class HttpExceptionFilterFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const errMsg = exception.message;

    console.log(exception)

    response
      .status(status)
      .json({
        statusCode: status,
        err: errMsg.error,
        timestamp: new Date().toISOString,
        path: request.url
      });
  }
}
