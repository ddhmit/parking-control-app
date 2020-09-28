import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { environment } from '../../environments/environment';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { AlertService } from './alert.service';
import {
  Downloader,
  DownloadRequest,
  NotificationVisibility,
} from '@ionic-native/downloader/ngx';
import { File } from '@ionic-native/file/ngx';
import { Plugins } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
const { Device } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private transfer: FileTransfer,
    private alertService: AlertService,
    private downloader: Downloader,
    public platform: Platform,
    private file: File,
    private fileOpener: FileOpener
  ) {}
  // 文件上传
  fileTransfer: FileTransferObject = this.transfer.create();
  // 登录
  login(params = {}) {
    return this.http.post('/api/access/login', params);
  }
  // 创建商户
  updateMerchant(params = {}) {
    return this.http.post('/api/merchant', params);
  }
  // 获取商户信息
  merchant(params = {}) {
    return this.http.post('/api/merchant/index', params);
  }
  // 获取用户信息
  user(params = {}) {
    return this.http.post('/api/user/index', params);
  }
  // 更新用户信息
  updateUser(params = {}) {
    return this.http.post('/api/user', params);
  }
  // 获取员工列表
  staff(params = {}) {
    return this.http.post('/api/merchant/staff/index', params);
  }
  // 新增修改员工列表
  updateStaff(params = {}) {
    return this.http.post('/api/merchant/staff/update', params);
  }
  // 删除员工
  deleteStaff(params = {}) {
    return this.http.post('/api/merchant/staff/delete', params);
  }
  // 新增车辆
  updateCar(params = {}) {
    return this.http.post('/api/merchant/car/update', params);
  }
  // 删除车辆
  deleteCar(params = {}) {
    return this.http.post('/api/merchant/car/delete', params);
  }

  // 发送短信
  sms(params = {}) {
    return this.http.post('/api/sms', params);
  }

  // 车辆出入记录
  carInAndOut(params = {}) {
    return this.http.post('/api/car/inAndOut/index', params);
  }

  // 车辆装卸货记录
  carLoadAndUnload(params = {}) {
    return this.http.post('/api/car/loadAndUnload/index', params);
  }

  // 装卸车放行
  carInOutOperation(params = {}) {
    return this.http.post('/api/car/operation', params);
  }

  // 刷新令牌
  refreshToken(params = null) {
    this.storeService.getObject('user').then((user) => {
      this.http
        .post(
          '/api/access/refreshToken',
          params || {
            refreshToken: user && user.refreshToken,
          }
        )
        .subscribe((res: any) => {
          this.storeService.setObject({
            key: 'user',
            value: { ...user, ...res.data },
          });
        });
    });
  }

  // 获取版本号
  version(params = {}) {
    if (!this.platform.is('android')) {
      return;
    }
    return this.http
      .post('/api/version/index', params)
      .subscribe((res: any) => {
        const verArr = res.data;
        if (!verArr.length) {
          return;
        }
        // 线上最新版
        const latestVer = verArr[verArr.length - 1];
        // 获取本地版本号
        Device.getInfo().then(async (app) => {
          if (latestVer.version > app.appVersion) {
            // 获取apk路径和名称
            const apk: any = await this.storeService.getObject('apk');
            // 本地是否已存在安装包
            const hasFile =
              apk && (await this.file.checkFile(apk.filePath, apk.fileName));
            // 弹出下载提示
            this.alertService.show({
              header: `发现新版本 V${latestVer.version}`,
              subHeader: hasFile ? '本次更新不消耗流量' : latestVer.date,
              message: (() => {
                let logStr = '';
                latestVer.log.map((item) => {
                  logStr += `<li>${item}</li>`;
                });
                return `<ol>${logStr}</ol>更多精彩等您发现...`;
              })(),
              buttons: [
                {
                  text: '下次再说',
                  handler: () => {},
                },
                {
                  text: '立即更新',
                  handler: () => {
                    // 如果本地已经存在安装包
                    if (hasFile) {
                      this.fileOpener.open(
                        apk.filePath + apk.fileName,
                        'application/vnd.android.package-archive'
                      );
                    } else {
                      this.download(latestVer);
                    }
                  },
                },
              ],
            });
          } else {
            // return this.alertService.show({
            //   message: '当前已是最新版',
            // });
          }
        });
      });
  }

  // 下载新版本
  download(latestVer) {
    const { version = 'latest' } = latestVer;
    var request: DownloadRequest = {
      uri: `${environment.baseUrl}/api/download/${version}`,
      title: `智慧平台商户端 V${version}`,
      description: '正在进行版本更新，稍安勿躁哦~',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: `智慧平台商户端 V${version}.apk`,
      },
    };
    this.downloader.download(request).then(async (location: string) => {
      const localIdx = location.lastIndexOf('/') + 1;
      // 获取文件路径
      const filePath = location.substring(0, localIdx);
      // 获取文件名
      const fileName = location.substring(localIdx, location.length);
      // 将最新版存到本地
      await this.storeService.setObject({
        key: 'apk',
        value: { fileName, filePath },
      });
      this.fileOpener.open(location, 'application/vnd.android.package-archive');
    });
  }

  // 上传
  async upload(filePath, options: FileUploadOptions = {}) {
    const storage: any = await this.storeService.getObject('user');
    if (storage && storage.accessToken) {
      options.headers = {
        Authorization: 'Bearer ' + storage.accessToken,
      };
    }
    return this.fileTransfer.upload(
      filePath,
      environment.baseUrl + '/api/upload',
      options
    );
  }

  // 错误上报
  alarm(params = {}) {
    return this.http.post('/api/alarm/create', params).subscribe();
  }
}
