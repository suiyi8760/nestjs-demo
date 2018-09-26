import { ExecutionContext, NestInterceptor, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, call$: Observable<any>): Observable<any> {
    console.log('LoggingInterceptor Before...');

    const now = Date.now();
    return call$.pipe(
      tap(() => console.log(`After... ${Date.now() - now}ms.`)),
      // 使用rxjs提供的catchError捕获错误
      catchError((err) => throwError(new HttpException('catch by TransformInterceptor', HttpStatus.BAD_GATEWAY)))
    );
  }
};

export interface Response<T> {
  data: T
};

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, call$: Observable<T>): Observable<Response<T>> {
    return call$.pipe(
      map((data) => {
        console.log('TransformInterceptor data:', data);
        return { data };
      }),
    );
  }
};