import { Component } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';
import { ModalService } from 'src/app/services/modal.service';
import { GreenLightPage } from '../green-light/green-light.page';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router,
    private apiService: ApiService
  ) {}
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

  ngOnInit() {
    this.inputArr[0].disabled = false;
    // 获取版本号
    this.apiService.version();
  }

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
    // 等待键盘关闭
    setTimeout(() => {
      this.router.navigate(['/green-light'], {
        queryParams: { carNo: this.carNo },
      });
    }, 500);
    // this.modalService.show({
    //   component: GreenLightPage,
    //   componentProps: {
    //     carNo: this.carNo,
    //   },
    // });
  }

  renderKeyboard(keyboardLayout) {
    this.currentRenderKeyboard = keyboardLayout;
  }
}
