import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyInfoPageRoutingModule } from './my-info-routing.module';

import { MyInfoPage } from './my-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyInfoPageRoutingModule
  ],
  declarations: [MyInfoPage]
})
export class MyInfoPageModule {}
