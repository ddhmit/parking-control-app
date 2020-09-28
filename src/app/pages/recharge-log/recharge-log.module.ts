import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RechargeLogPageRoutingModule } from './recharge-log-routing.module';

import { RechargeLogPage } from './recharge-log.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RechargeLogPageRoutingModule,
  ],
  declarations: [RechargeLogPage],
})
export class RechargeLogPageModule {}
