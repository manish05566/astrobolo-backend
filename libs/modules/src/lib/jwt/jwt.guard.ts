import { SetMetadata } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { ExtractJwt } from "passport-jwt";
import { JwtPayload } from "@xapads/types";
import * as crypto from "crypto";


@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly jwt: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx: HttpArgumentsHost = context.switchToHttp();

    const req: Request = ctx.getRequest();

    const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    //console.log('token in auth', token)
    if (!token) {
      throw new HttpException(
        "Your session is expired. Please log in again to continue.",
        401
      );
    }

    try {
      const payload = this.jwt.verify(token);

      // Check for user or vendor
      if (payload.user) {
        req["user"] = payload.user;
        req.headers["x-user-id"] = payload.user.id;
      } else if (payload.vendor) {
        (req as any).vendor = payload.vendor;
        (req as any).headers['x-vendor-id'] = payload.vendor.id;

      } else {
        throw new HttpException("Invalid token. Please log in again.", 401);
      }

      return true;
    } catch (error: any) {
      throw new HttpException(
        "Your session is expired. Please log in again to continue.",
        401
      );
    }
  }
}


