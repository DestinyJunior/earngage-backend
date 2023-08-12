import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * Customer decorator function that returns a value from the request data property.
 */
export const DataParam = createParamDecorator(
  (prop: keyof Request['data'], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const data = request.data;

    return prop ? data?.[prop] : data;
  },
);
