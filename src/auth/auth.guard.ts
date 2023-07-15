import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];
    if (!token) return false;
    const user = await this.authService.getUserFromToken(token);
    if (!user) return false;
    req['user'] = user;
    return true;
  }
}
