import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoAuditPage } from './info-audit.page';

const routes: Routes = [
  {
    path: '',
    component: InfoAuditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoAuditPageRoutingModule {}
