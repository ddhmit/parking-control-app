import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }

  async show(option: Object = {}) {
    const loading = await this.loadingController.create({
      message: '请稍后...',
      spinner: 'crescent',
      duration: 2000,
      ...option
    });
    await loading.present();
  }
}
