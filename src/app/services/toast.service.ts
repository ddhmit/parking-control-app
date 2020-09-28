import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(public toastController: ToastController) {}

  // 显示提示
  async show(option: Object = {}) {
    const toast = await this.toastController.create({
      position: 'top',
      duration: 1500,
      color: 'dark',
      ...option,
    });
    toast.present();
  }
}
