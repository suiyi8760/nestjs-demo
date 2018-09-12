import { Injectable, MiddlewareFunction, NestMiddleware } from '@nestjs/common';

@Injectable()
export class NormalMidMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log(`Run Normal Middleware.`);
      next();
    };
  }
}

/**
 *  简单的中间件使用函数式也是可以的：
 * 
 *  export function NormalMidMiddleware(req, res, next) {
 *    console.log(`Run Normal Middleware.`);
 *    next();
 *  };
 */
