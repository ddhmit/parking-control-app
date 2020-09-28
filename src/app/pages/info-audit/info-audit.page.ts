import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { ActionSheetService } from 'src/app/services/action-sheet.service';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
import { StoreService } from 'src/app/services/store.service';

const { Camera } = Plugins;

@Component({
  selector: 'app-info-audit',
  templateUrl: './info-audit.page.html',
  styleUrls: ['./info-audit.page.scss'],
})
export class InfoAuditPage implements OnInit {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private helperService: HelperService,
    private alertService: AlertService,
    private toastService: ToastService,
    private apiService: ApiService,
    private storeService: StoreService,
    private actionSheet: ActionSheetService
  ) {}

  // 初始化
  crescent: Boolean = false; // 转圈圈
  btnDisabled: Boolean = false; // 按钮禁用
  auditInfo: String = '商户审核'; // 审核状态
  timer = null; // 计时器
  init = true; // 第一次进入页面
  loading: any = {}; // 转圈圈容器
  // 页面数据
  pageData: any = {
    user: {
      // 身份证
      idCard: {
        photo: {
          head: '',
          emblem: '',
        },
      },
    },
    merchant: {
      // 商户名称
      name: '',
      // 营业执照照片
      businessLicense: {
        photo: '',
      },
      // 租房合同
      rentalContract: {
        page1: '',
        page999: '',
      },
    },
  };
  // 渲染上传html
  uploadEle = [
    {
      ref: 'pageData.user.idCard.photo.head',
      defaultImage: '../../../assets/image/idCardHead.png',
      name: '身份证头像面',
    },
    {
      ref: 'pageData.user.idCard.photo.emblem',
      defaultImage: '../../../assets/image/idCardEmblem.png',
      name: '身份证国徽面',
    },
    {
      ref: 'pageData.merchant.rentalContract.page1',
      defaultImage: '../../../assets/image/page1.png',
      name: '租房合同首页',
    },
    {
      ref: 'pageData.merchant.rentalContract.page999',
      defaultImage: '../../../assets/image/page999.png',
      name: '租房合同底页',
    },
    {
      ref: 'pageData.merchant.businessLicense.photo',
      defaultImage: '../../../assets/image/businessLicense.png',
      name: '营业执照',
    },
  ];

  // 构造表单
  infoForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ionViewWillLeave() {
    this.timer && this.timer.stop();
  }

  ngOnInit() {
    this.user();
    this.merchant();
    this.timer = this.helperService.momentTimer(
      () => {
        this.merchant();
      },
      {},
      8000
    );
  }
  // UI状态控制
  crescentAndbtnDisabled(status) {
    this.crescent = status;
    this.btnDisabled = status;
  }

  async takePicture(source, ref) {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    eval(`this.${ref} = image.webPath`);
    this.upload(image.path, ref);
  }

  getPicture(ref) {
    this.actionSheet.show({
      header: '请选择上传图片的方式',
      buttons: [
        {
          text: '拍照',
          icon: 'camera-outline',
          handler: () => {
            this.takePicture(CameraSource.Camera, ref);
          },
        },
        {
          text: '从相册中选择',
          icon: 'image-outline',
          handler: () => {
            this.takePicture(CameraSource.Photos, ref);
          },
        },
        {
          text: '取消选择',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
  }

  // 获取商户信息
  merchant() {
    this.apiService.merchant().subscribe((res: any) => {
      if (res.data.docs.length) {
        const merchant = res.data.docs[0];
        if (this.init) {
          // 页面初始化赋值
          this.pageData.merchant = {
            rentalContract: merchant.rentalContract,
            businessLicense: merchant.businessLicense,
          };
          this.infoForm.setValue({ name: merchant.name });
        }
        this.pageData.merchant.name = merchant.name;
        // 刷新一次
        this.apiService.refreshToken();
        this.storeService.setObject({
          key: 'merchant',
          value: merchant,
        });
        if (merchant.status == '正常') this.router.navigate(['/tabs']);
        this.auditInfo = `资料${merchant.status}`;
      }
      this.init = false;
    });
  }

  // 获取用户信息
  user() {
    this.apiService.user().subscribe((res: any) => {
      if (res.data.docs.length) {
        const user = res.data.docs[0];
        this.pageData.user.idCard = user.idCard;
      }
    });
  }

  // 图片加上http前缀
  getImageUrl(ref) {
    const url = eval(`this.${ref}`);
    if (!url || url.startsWith('https://') || url.startsWith('http://')) {
      return url;
    }
    return environment.baseUrl + url;
  }

  // 更新商户资料
  updateMerchant(params) {
    // 调用创建商户服务
    this.apiService.updateMerchant(params).subscribe(
      (res: any) => {
        this.auditInfo = '资料审核中...';
        this.alertService.show({
          header: '提交成功',
          message:
            '等待管理员审核，审核通过后您将自动进入到首页，等待期间您可以再次修改提交资料',
        });
        // 刷新一次
        this.apiService.refreshToken();
        this.timer.start();
        // 更新用户信息
        this.updateUser();
        this.crescentAndbtnDisabled(false);
      },
      (err) => {
        this.crescentAndbtnDisabled(false);
      }
    );
  }
  // 更新用户信息
  async updateUser() {
    await this.apiService.updateUser(this.pageData.user).toPromise();
  }

  // 上传
  async upload(filePath, ref) {
    this.loading[ref] = true;
    const res: any = await this.apiService.upload(filePath);
    console.log('图片上传结果：', res);
    if (res.responseCode == 200) {
      const reslut = JSON.parse(res.response);
      eval(`this.${ref} = reslut.data.file`);
    } else {
      eval(`this.${ref} = ''`);
      throw {
        error: {
          msg: '上传失败！',
        },
      };
    }
    this.loading[ref] = false;
  }

  async submit() {
    // 控制状态
    this.crescentAndbtnDisabled(true);
    // 表单验证
    const params = await this.helperService.validate(
      this.infoForm,
      '商户名称必填',
      () => {
        // 验证失败后改变圈圈及按钮状态
        this.crescentAndbtnDisabled(false);
      }
    );
    // 创建商户
    this.updateMerchant({
      ...this.pageData.merchant,
      name: params.name,
    });
  }
}
