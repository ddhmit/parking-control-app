import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GreenLightListPage } from './green-light-list.page';

const routes: Routes = [
  {
    path: '',
    component: GreenLightListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GreenLightListPageRoutingModule {}
