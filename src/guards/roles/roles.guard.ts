import { CanActivate, ExecutionContext, Injectable, ReflectMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // console.log('getClass', context.getClass());
    // console.log('getHandler', context.getHandler());
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles);
    // roles为空视为不作权限控制，返回true
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    return request.get('role') && roles.includes(request.get('role'));
  }
}

export const Roles = (...roles: string[]) => ReflectMetadata('roles', roles);
