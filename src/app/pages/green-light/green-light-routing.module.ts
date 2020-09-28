import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreenLightPage } from './green-light.page';

const routes: Routes = [
  {
    path: '',
    component: GreenLightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GreenLightPageRoutingModule {}
