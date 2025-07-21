import {
  SetMetadata,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { Observable } from 'rxjs';



export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Public = () => SetMetadata('roles', ['PUBLIC']);

@Injectable()
export class HeadersGuard implements CanActivate {

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {

    const ctx: HttpArgumentsHost = context.switchToHttp();

    const req: Request = ctx.getRequest();
    const res = ctx.getResponse<Response>();

    try {

      const { 'x-app': app, 'x-country': country, 'x-platform': platform, 'x-device-id': device_id } = req.headers;
      if (typeof app === 'string') {
        req.headers['x-app'] = app.toUpperCase();
      }

      if (typeof country === 'string') {
        req.headers['x-country'] = country.toUpperCase();
      }

      if (typeof platform === 'string') {
        req.headers['x-platform'] = platform.toUpperCase();
      }
      req.headers['x-device-id'] = device_id;
      
      return true;
    } catch (error: any) {
      throw new HttpException('App, platform, and country are required in the headers.', 400);
    }
  }
}
