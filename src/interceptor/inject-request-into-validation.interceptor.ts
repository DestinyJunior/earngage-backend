import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

export const REQUEST = '_request';

/**
 * Injects the request data property values into the request body object.
 */
@Injectable()
export class InjectRequestIntoValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body) {
      request.body[REQUEST] = {
        user: request.data.user?.toObject({ virtuals: true }),
        admin: request.data.admin?.toObject({ virtuals: true }),
      };
    }

    return next.handle();
  }
}
