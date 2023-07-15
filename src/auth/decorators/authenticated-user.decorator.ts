import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';

export const AuthUser = createParamDecorator(
  (_data: string, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    if (!request.user) {
      throw new NotFoundException('User not found.');
    }

    return request.user;
  },
);
