import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class ActionSheetService {
  constructor(public actionSheetController: ActionSheetController) {}
  async show(option: any = {}) {
    const actionSheet = await this.actionSheetController.create({
      header: '请选择上传图片的方式',
      buttons: [
        {
          text: '拍照',
          icon: 'camera-outline',
          handler: () => {
            console.log('默认按钮 拍照');
          },
        },
        {
          text: '从相册中选择',
          icon: 'image-outline',
          handler: () => {
            console.log('默认按钮 从相册中选择');
          },
        },
        {
          text: '取消选择',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('默认按钮 取消选择');
          },
        },
      ],
      ...option,
    });
    await actionSheet.present();
  }
}
