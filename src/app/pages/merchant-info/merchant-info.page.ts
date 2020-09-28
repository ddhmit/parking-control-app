import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.page.html',
  styleUrls: ['./merchant-info.page.scss'],
})
export class MerchantInfoPage implements OnInit {
  constructor(private apiService: ApiService) {}

  info: any = {
    integral: 0,
    name: '正在加载..',
    createdAt: Date.now(),
  };

  // 获取商户信息
  merchant() {
    this.apiService.merchant().subscribe((res: any) => {
      if (res.data.docs.length) {
        this.info = res.data.docs[0];
      }
    });
  }

  ngOnInit() {
    this.merchant();
  }
}
