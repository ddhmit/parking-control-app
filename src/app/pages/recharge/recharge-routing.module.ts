import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RechargePage } from './recharge.page';

const routes: Routes = [
  {
    path: '',
    component: RechargePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RechargePageRoutingModule {}
