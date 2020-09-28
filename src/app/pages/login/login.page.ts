import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { environment } from '../../../environments/environment';
import { Plugins } from '@capacitor/core';
import { AlertService } from 'src/app/services/alert.service';

const { Device, Browser } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private helperService: HelperService,
    private apiService: ApiService,
    private alertService: AlertService,
    private storeService: StoreService
  ) {}
  // 构造表单
  loginForm = this.fb.group({
    phone: [
      '',
      [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(
          /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
        ),
      ],
    ],
    code: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
        Validators.pattern(/^\d{6}$/),
      ],
    ],
    market: [environment.market],
  });

  // 初始化
  countdown: number = 0; // 倒计时
  timer = null; // 计时器
  crescent: any = {
    // 转圈圈
    login: false,
    sms: false,
  };
  btnDisabled: Boolean = false; // 按钮禁用

  ngOnInit() {
    this.loginForm.controls['code'].reset();
    this.loginForm.controls['phone'].reset();
  }

  // UI状态控制
  crescentAndbtnDisabled(key, status) {
    this.crescent[key] = status;
    this.btnDisabled = this.crescent.login.status;
  }

  // 获取验证码
  getCode() {
    this.crescentAndbtnDisabled('sms', true);
    const { phone, market } = this.loginForm.value;
    // 发送短信
    this.apiService
      .sms({
        phone,
        market,
        type: 603935,
        smsScene: '登录',
      })
      .subscribe(
        (res: any) => {
          this.crescentAndbtnDisabled('sms', false);
          this.startCountdown();
        },
        (err) => {
          this.crescentAndbtnDisabled('sms', false);
        }
      );
  }

  // 开始倒计时
  startCountdown() {
    this.countdown = 60;
    this.timer = this.helperService.momentTimer(
      () => {
        if (this.countdown <= 1) {
          this.timer && this.timer.stop();
        }
        --this.countdown;
      },
      {},
      1000
    );
  }

  // 获取商户信息
  merchant() {
    this.apiService.merchant().subscribe((res: any) => {
      this.storeService
        .setObject({
          key: 'merchant',
          value: res.data.docs[0],
        })
        .then(() => {
          this.router.navigate(['/tabs']);
        });
    });
  }

  async login() {
    // 控制状态
    this.crescentAndbtnDisabled('login', true);
    // 表单验证
    const parmas = {
      ...(await this.helperService.validate(
        this.loginForm,
        '请完善手机号和验证码',
        () => {
          // 验证失败后改变圈圈及按钮状态
          this.crescentAndbtnDisabled('login', false);
        }
      )),
      version: (await Device.getInfo()).appVersion,
    };

    // 调用登录服务
    this.apiService.login(parmas).subscribe(
      (res: any) => {
        this.storeService
          .setObject({
            key: 'user',
            value: res.data,
          })
          .then(() => {
            this.merchant();
          });
        this.crescentAndbtnDisabled('login', false);
      },
      (err) => {
        if (err.status == 406) {
          const url = err.error.msg.split(' ')[1];
          this.alertService.show({
            message: `当前APP版本过低，已无法正常使用`,
            buttons: [
              {
                text: '获取最新版',
                handler: async () => {
                  return await Browser.open({ url });
                },
              },
            ],
          });
        }
        this.crescentAndbtnDisabled('login', false);
      }
    );
  }
}
