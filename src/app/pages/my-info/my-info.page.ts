import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.page.html',
  styleUrls: ['./my-info.page.scss'],
})
export class MyInfoPage implements OnInit {
  constructor(
    private apiService: ApiService,
    private storeService: StoreService
  ) {}

  async ngOnInit() {
    await this.user();
    this.merchant();
  }

  // 用户信息
  userInfo: any = {};
  // 商户
  merchantInfo: any = {};

  // 获取用户信息
  async user() {
    this.userInfo = await this.storeService.getObject('user');
  }

  // 获取商户信息
  merchant() {
    this.apiService.merchant().subscribe((res: any) => {
      this.merchantInfo = res.data.docs[0];
      console.log(this.merchantInfo);
    });
  }
}
