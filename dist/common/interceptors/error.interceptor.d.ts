import { Observable } from 'rxjs';
import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
export declare class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    handle(context: any, err: any): Observable<never>;
}
