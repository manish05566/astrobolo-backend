import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '@xapads/types';
import * as crypto from 'crypto';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const Public = () => SetMetadata('roles', ['PUBLIC']);

@Injectable()
export class DummyToken implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();

    const req: Request = ctx.getRequest();

    req['user'] = {
      id: '5b77294a-d9bd-4379-ba71-9a165f67f0ca',
    };

    return true;
  }
}
