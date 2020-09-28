import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { ModalService } from 'src/app/services/modal.service';
import { GreenLightPage } from '../green-light/green-light.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private alertService: AlertService,
    private modalService: ModalService,
    private router: Router,
    private qrScanner: QRScanner
  ) {}
  light: boolean; //判断闪光灯
  frontCamera: boolean; //判断摄像头
  scanSub: Subscription;

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add(
      'cameraView'
    );
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          console.log('相机权限正常');
          // start scanning
          this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
            this.hideCamera();
            this.router.navigate(['/green-light'], {
              queryParams: { carInOut: text },
            });
            // this.modalService.show({
            //   component: GreenLightPage,
            //   componentProps: {
            //     carInOut: text,
            //   },
            // });
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
          this.alertService.show({
            message:
              '我们无法使用您的相机，需要您手动打开相机权限。立即去设置？',
            buttons: [
              {
                text: '取消',
                handler: () => {
                  this.navCtrl.pop();
                },
              },
              {
                text: '确认',
                handler: () => {
                  this.qrScanner.openSettings();
                },
              },
            ],
          });
        } else {
          this.navCtrl.pop();
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove(
      'cameraView'
    );
    this.scanSub ? this.scanSub.unsubscribe() : null;
    this.scanSub = null;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  ionViewDidEnter() {
    this.showCamera();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }

  // 闪光灯控制，默认关闭
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }
  // 前后摄像头互换
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }
  ngOnInit() {}
}
