import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, from } from 'rxjs';
import { retry, catchError, timeout } from 'rxjs/operators';
import { StoreService } from './services/store.service';
import { GlobalErrorHandler } from './global-error-handler';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(
    private storeService: StoreService,
    private globalErrorHandler: GlobalErrorHandler
  ) {}

  async dispose(req: HttpRequest<any>, next: HttpHandler) {
    console.log(Date.now(), req);
    let url = req.url,
      setHeaders = {};
    const defaultTimeout = 8; // 默认超时时间
    // 统一加上API前缀
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      url = environment.baseUrl + url;
    }
    // 获取token
    const storage: any = await this.storeService.getObject('user');
    if (storage && storage.accessToken) {
      setHeaders['Authorization'] = 'Bearer ' + storage.accessToken;
    }
    const newReq = req.clone({ url, setHeaders });
    return next
      .handle(newReq)
      .pipe(
        timeout((Number(req.headers.get('timeout')) || defaultTimeout) * 1000),
        retry(0),
        catchError((err: HttpErrorResponse) =>
          this.globalErrorHandler.handleError(err)
        )
      )
      .toPromise();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.dispose(req, next));
  }
}
