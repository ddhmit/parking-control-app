import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';
import 'moment-timer';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor() {}

  // 1.需要验证表单
  // 2.表单验证失败后的回调函数
  async validate(form: FormGroup, errMsg = '表单验证失败', failFn?: Function) {
    if (form.valid) {
      return form.value;
    }
    failFn && failFn();
    throw {
      error: {
        msg: errMsg,
      },
    };
  }

  // 重写的计时器
  // https://github.com/SeverinDK/moment-timer
  momentTimer(
    callback: Function,
    option: object = {},
    duration: number = 1000
  ) {
    return (moment.duration(duration) as any).timer(
      {
        loop: true,
        ...option,
      },
      callback
    );
  }
}
