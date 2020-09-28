import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { IonicModule } from '@ionic/angular';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { GreenLightListPageRoutingModule } from './green-light-list-routing.module';

import { GreenLightListPage } from './green-light-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzTagModule,
    NzBadgeModule,
    GreenLightListPageRoutingModule,
  ],
  declarations: [GreenLightListPage],
})
export class GreenLightListPageModule {}
