import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { MatButtonModule } from '@angular/material/button';
import { VirtualKeyboardComponent } from './virtual-keyboard.component';

@NgModule({
  declarations: [
    VirtualKeyboardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    NzDrawerModule,
    MatButtonModule
  ],
  exports: [
    VirtualKeyboardComponent
  ]
})
export class VirtualKeyboardModule { }
