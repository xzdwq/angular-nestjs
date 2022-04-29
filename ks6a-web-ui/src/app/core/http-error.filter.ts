import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LoadMaskService } from '@cmp/load-mask/load-mask.service';
import { MessageMaskService } from '@cmp/message-mask/message-mask.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor (
    private loadMaskService: LoadMaskService,
    private messageMaskService: MessageMaskService,
  ) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.loadMaskService.setLoad(false);

          let errMsg = '';
          error.error instanceof ErrorEvent
            ? errMsg = error.error.message
            : errMsg = error.status + ' - ' + error.statusText + ' | ' + error.message;

          this.messageMaskService.setIsShowMsg({
            type: 'danger', msgRaw: errMsg, subRaw: HttpErrorInterceptor.name,
          });

          throw new Error(errMsg);
        }),
      );
  };
}
