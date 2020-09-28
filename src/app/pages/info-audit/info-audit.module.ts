import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { InfoAuditPageRoutingModule } from './info-audit-routing.module';
import { MatBadgeModule } from '@angular/material/badge';
import { InfoAuditPage } from './info-audit.page';
import { ImgFallbackModule } from 'ngx-img-fallback';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatBadgeModule,
    NzSpinModule,
    ReactiveFormsModule,
    ImgFallbackModule,
    InfoAuditPageRoutingModule,
  ],
  declarations: [InfoAuditPage],
})
export class InfoAuditPageModule {}
