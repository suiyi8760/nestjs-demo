import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ParamMidMiddleware implements NestMiddleware {
  resolve(params: string): MiddlewareFunction {
    return (req, res, next) => {
      console.log('Run Param Middleware:', params);
      next();
    };
  }
}
