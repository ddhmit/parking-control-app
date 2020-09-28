import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
  styleUrls: ['./car.page.scss'],
})
export class CarPage implements OnInit {
  constructor(
    public loadingController: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {}

  // 商户信息
  info: any = {};
  // 当前渲染的键盘
  currentRenderKeyboard = '';
  // 是否显示键盘控制按钮
  isShowControl = false;
  // 车牌号
  carNo = '';
  // 键盘是否显示
  visible: Boolean = false;

  inputArr = [
    {
      value: '',
      keyboardLayout: '区域',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: 'ABC',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: '123/ABC',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: '123/ABC',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: '123/ABC',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: '123/ABC',
      disabled: true,
    },
    {
      value: '',
      keyboardLayout: '123/ABC/挂',
      disabled: true,
    },
  ];

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: '车辆加载中..',
    });
    await loading.present();
    await this.merchant();
    await loading.dismiss();
    this.inputArr[0].disabled = false;
  }

  // 获取商户信息
  async merchant() {
    this.info = ((await this.apiService
      .merchant()
      .toPromise()) as any).data.docs[0];
  }

  // 下拉刷新
  async doRefresh(event) {
    await this.merchant();
    event.target.complete();
  }

  // 新增车辆
  updateCar(carNo) {
    this.alertService.show({
      message: `是否将车辆【${carNo}】绑定到您的名下？已绑定的车辆可优先使用账户余额支付停车费。`,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: '确认',
          handler: () => {
            this.apiService
              .updateCar({ num: carNo })
              .subscribe(async (res: any) => {
                await this.merchant();
              });
          },
        },
      ],
    });
  }

  // 删除车辆
  deleteCar(item, idx) {
    this.alertService.show({
      message: `确认删除车辆【${item.num}】？删除后该车辆将不能使用账户余额支付停车费。`,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: '确认',
          handler: () => {
            this.apiService
              .deleteCar({ num: item.num })
              .subscribe(async (res: any) => {
                this.info.car.splice(idx, 1);
              });
          },
        },
      ],
    });
  }

  // 显示键盘
  showKeyboard() {
    this.visible = true;
  }

  // 获取当前非禁用的input的索引
  getFocusInputIndex() {
    return this.inputArr.findIndex((item) => !item.disabled);
  }

  // 键盘区域点击事件的回调
  onKeyboardClick(e) {
    const inputIndex = this.getFocusInputIndex();
    this.inputArr[inputIndex].value = e[1];
    const nextInputIndex = inputIndex + 1;
    if (nextInputIndex < this.inputArr.length) {
      this.inputArr[inputIndex].disabled = true;
      this.inputArr[nextInputIndex].disabled = false;
      this.renderKeyboard(this.inputArr[nextInputIndex].keyboardLayout);
    }
  }

  onDelClick(e) {
    const inputIndex = this.getFocusInputIndex();
    this.inputArr[inputIndex].value = '';
    const preInputIndex = inputIndex - 1;
    if (preInputIndex >= 0) {
      this.inputArr[inputIndex].disabled = true;
      this.inputArr[preInputIndex].disabled = false;
      this.renderKeyboard(this.inputArr[preInputIndex].keyboardLayout);
    }
  }

  onClearClick(e) {
    this.carNo = '';
    this.inputArr.map((item) => {
      item.disabled = true;
      item.value = '';
    });
    this.currentRenderKeyboard = this.inputArr[0].keyboardLayout;
    this.inputArr[0].disabled = false;
  }

  onOkClick(e) {
    this.carNo = '';
    this.inputArr.map((item) => {
      this.carNo += item.value;
    });
    const carNoValid = /^(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-HJ-NP-Z]{1}(?:(?:[0-9]{5}[DF])|(?:[DF](?:[A-HJ-NP-Z0-9])[0-9]{4})))|(?:[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领 A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9 挂学警港澳]{1})$/.test(
      this.carNo
    );
    if (!carNoValid) {
      return this.toastService.show({
        message: '车牌输入错误！',
        color: 'danger',
      });
    }
    this.visible = false;
    this.updateCar(this.carNo);
  }

  renderKeyboard(keyboardLayout) {
    this.currentRenderKeyboard = keyboardLayout;
  }
}
