import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;
    const url = request.url;

    if (user) {
      this.logger.log(`Authenticated Request: ${method} ${url} - User: ${user.sub}`);
    } else {
      this.logger.log(`Public Request: ${method} ${url}`);
    }

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Request completed in ${Date.now() - now}ms`)),
      );
  }
}
