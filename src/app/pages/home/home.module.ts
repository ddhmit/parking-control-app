import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { NzInputModule } from 'ng-zorro-antd/input';
import { VirtualKeyboardModule } from 'src/app/components/virtual-keyboard/virtual-keyboard.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    NzInputModule,
    VirtualKeyboardModule,
    RouterModule.forChild([{ path: '', component: HomePage }]),
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
