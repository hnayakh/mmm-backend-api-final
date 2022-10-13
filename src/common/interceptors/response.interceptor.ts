import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core/services';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ResponseService } from 'src/shared/services/response.service';
import { ResponseMessageKey } from './response.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseMessage =
      this.reflector.get<string>(ResponseMessageKey, context.getHandler()) ??
      '';
    let res1 = new ResponseService();
    let ctx = context.switchToHttp();
    let response = ctx.getResponse();
    console.log(response)
    return next.handle().pipe(
      map((data) => ({
        status: context.switchToHttp().getResponse().statusCode,
        message: data.message,
        data: data.data,
        type: "SUCCESS",
      })),
      // map((resObj) => {

      //   res1.successResponse(
      //     context.switchToHttp().getResponse().statusCode,
      //     resObj.message,
      //     resObj.data,
      //     context.switchToHttp().getResponse(),
      //     resObj.headers ?? resObj.headers,
      //   );
      // })
    );
  }
  // intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  //   let res1 = new ResponseService();
  //   let ctx = context.switchToHttp();
  //   let response = ctx.getResponse();
  //   return next.handle().pipe(
  //     map((resObj) => {
  //       console.log("response returned");
  //       res1.successResponse(
  //         response.statusCode,
  //         resObj.message,
  //         resObj.data,
  //         response,
  //         resObj.headers ?? resObj.headers,
  //       );
  //     }),
  //   );
  // }
}
