import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { MerchantInfoPageRoutingModule } from './merchant-info-routing.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { MerchantInfoPage } from './merchant-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzResultModule,
    NzToolTipModule,
    MerchantInfoPageRoutingModule,
  ],
  declarations: [MerchantInfoPage],
})
export class MerchantInfoPageModule {}
