import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarPageRoutingModule } from './car-routing.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { VirtualKeyboardModule } from 'src/app/components/virtual-keyboard/virtual-keyboard.module';
import { CarPage } from './car.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NzInputModule,
    VirtualKeyboardModule,
    CarPageRoutingModule,
  ],
  declarations: [CarPage],
})
export class CarPageModule {}
