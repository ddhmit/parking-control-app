import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GreenLightPageRoutingModule } from './green-light-routing.module';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { GreenLightPage } from './green-light.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzResultModule,
    NzDescriptionsModule,
    GreenLightPageRoutingModule,
  ],
  declarations: [GreenLightPage],
})
export class GreenLightPageModule {}
