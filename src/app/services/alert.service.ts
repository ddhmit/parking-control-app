import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public alertController: AlertController) {}
  async show(option: any = {}) {
    const alert = await this.alertController.create({
      header: '提示',
      subHeader: null,
      backdropDismiss: false,
      message: '这是一则提示',
      buttons: ['确认'],
      ...option,
    });
    await alert.present();
  }
}
