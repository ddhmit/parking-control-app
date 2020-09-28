import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargePageRoutingModule } from './recharge-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RechargePage } from './recharge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzButtonModule,
    RechargePageRoutingModule,
  ],
  declarations: [RechargePage],
})
export class RechargePageModule {}
