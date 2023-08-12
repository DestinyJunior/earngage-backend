import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from 'src/app/admin/schemas/admin.schema';
import { User } from 'src/app/user/schemas/user.schema';

/**
 * Customer decorator function that returns the request user (authenticated user) property.
 */
export const UserParam = createParamDecorator(
  (data: string, ctx: ExecutionContext): User | Admin | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
