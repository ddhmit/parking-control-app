import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrScannerPageRoutingModule } from './qr-scanner-routing.module';

import { QrScannerPage } from './qr-scanner.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, QrScannerPageRoutingModule],
  declarations: [QrScannerPage],
})
export class QrScannerPageModule {}
