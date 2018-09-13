import { ArgumentsHost, Catch, ExceptionFilter, UnauthorizedException, HttpException } from '@nestjs/common';

@Catch(HttpException, UnauthorizedException)
export class MultiHttpExceptionFilterFilter implements ExceptionFilter {
  // 需要捕获多个异常的情况，exception可以使用联合类型
  catch(exception: HttpException | UnauthorizedException, host: ArgumentsHost) {
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
        err: errMsg.error || exception.message,
        timestamp: new Date().toISOString,
        path: request.url
      });
  }
}
