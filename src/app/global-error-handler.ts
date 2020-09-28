import { environment } from 'src/environments/environment';
import { ToastService } from './services/toast.service';
import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { StoreService } from './services/store.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import * as StackTrace from 'stacktrace-js';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

// 全局异常处理
@Injectable()
export class GlobalErrorHandler {
  constructor(private injector: Injector) {}
  handleError(error: any) {
    const toastService = this.injector.get(ToastService);
    const router = this.injector.get(Router);
    const apiService = this.injector.get(ApiService);
    const storeService = this.injector.get(StoreService);
    const CODEMESSAGE = {
      0: '请求异常，请检查与服务器的连接是否正常！',
      200: '服务器成功返回请求的数据。',
      201: '新建或修改数据成功。',
      202: '一个请求已经进入后台排队（异步任务）。',
      204: '删除数据成功。',
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
      401: '用户没有权限（令牌、用户名、密码错误）。',
      403: '用户得到授权，但是访问是被禁止的。',
      404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
      406: '请求的格式不可得。',
      410: '身份验证过期，请重新登录',
      422: '当创建一个对象时，发生一个验证错误。',
      500: '服务器发生错误，请检查服务器。',
      502: '网关错误。',
      503: '服务不可用，服务器暂时过载或维护。',
      504: '网关超时。',
    };

    let errMsg = '出现了预料之外的错误，请联系管理员！';
    let errSource = '服务器';
    if (error instanceof HttpErrorResponse) {
      if (error.status == 401) {
        apiService.refreshToken();
      } else if (error.status == 410) {
        storeService.clear().then(() => {
          router.navigate(['/login']);
        });
      }
      errMsg =
        (error.error && error.error.msg) ||
        CODEMESSAGE[error.status] ||
        error.statusText;
    } else {
      errSource = '客户端';
      error = error.rejection || error;
      errMsg =
        (error && error.error && (error.error.message || error.error.msg)) ||
        '网络请求超时，请稍后重试！';
      if (environment.production) {
        StackTrace.fromError(error)
          .then((StackFrames) => {
            Device.getInfo().then((app) => {
              // 错误上报
              apiService.alarm({
                // 类型
                type: `APP v${app.appVersion} ${error.name}`,
                // 详细信息
                details: error.message,
                // 正文
                content: StackFrames.slice(0, 3),
              });
            });
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }

    if (!environment.production) {
      errMsg += ' 详情请移步至控制台';
      console.warn(`${Date.now()} 捕获到${errSource}错误 ☟ `);
      console.error(error);
    }
    toastService.show({
      color: 'danger',
      message: errMsg,
    });
    return throwError(error);
  }
}
