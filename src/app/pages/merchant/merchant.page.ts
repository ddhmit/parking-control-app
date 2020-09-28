import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { Plugins } from '@capacitor/core';
const { Device } = Plugins;

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.page.html',
  styleUrls: ['./merchant.page.scss'],
})
export class MerchantPage implements OnInit {
  constructor(
    private apiService: ApiService,
    private storeService: StoreService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {}

  isShow = true;
  appVersion = '';
  async ionViewWillEnter() {
    // 商户员工
    // 商户责任人
    // 市场员工
    // 市场责任人
    const { identity } = await this.storeService.getObject('user');
    if (identity['商户责任人']) {
      this.isShow = true;
    }
    if (identity['商户员工']) {
      this.isShow = false;
    }
    this.appVersion = (await Device.getInfo()).appVersion;
  }

  logout() {
    this.alertService.show({
      header: '提示',
      message: '是否确认登出当前账号？',
      buttons: [
        {
          text: '取消',
          handler: () => {},
        },
        {
          text: '确认',
          handler: () => {
            this.storeService.clear().then(() => {
              this.router.navigate(['/login']);
            });
          },
        },
      ],
    });
  }

  version() {
    this.apiService.version();
  }
}
