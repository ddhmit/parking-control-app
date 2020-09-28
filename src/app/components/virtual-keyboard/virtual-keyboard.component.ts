import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.scss'],
})
export class VirtualKeyboardComponent implements OnInit {
  constructor() {}
  @Input() visible: Boolean;
  @Input() keyboardConfig: Object = {
    区域: [
      ['云', '渝', '川', '贵', '湘', '黑', '鄂', '粤'],
      ['京', '津', '沪', '冀', '豫', '辽', '甘', '青'],
      ['皖', '鲁', '新', '苏', '浙', '赣', '藏', '宁'],
      ['桂', '晋', '蒙', '陕', '吉', '闽', '琼', '使'],
    ],
    ABC: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
      ['L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
    '123/ABC': [
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
      ['L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
    '123/ABC/挂': [
      ['挂', '学', '警', '港', '澳', '领'],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K'],
      ['L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ],
  };
  @Input() inputBox: TemplateRef<any>;
  @Input() currentRenderKeyboard: String;
  @Input() isShowControl: Boolean = false;
  @Output() onDelClick = new EventEmitter();
  @Output() onOkClick = new EventEmitter();
  @Output() onClearClick = new EventEmitter();
  @Output() onKeyboardClick = new EventEmitter();
  @Output() visibleChange = new EventEmitter<Boolean>();
  @Output() currentRenderKeyboardChange = new EventEmitter<String>();

  // 控制到一行10个按钮可呈现最佳显示状态
  keyBtnGroup = []; // 键盘组
  arrayDepth = null; // 数组深度，之前为了支持一维数组创建的，现在看来不用了，config中的每一项必须为二维数组
  switchKeyGroup = []; // 功能切换键组

  // 之前为了支持一维数组创建的，现在看来不用了，config中的每一项必须为二维数组
  // getArrayDepth(value) {
  //   if (this.arrayDepth != null) {
  //     return this.arrayDepth;
  //   }
  //   const depth = (value) => {
  //     return Array.isArray(value) ?
  //       1 + Math.max(...value.map(depth)) :
  //       0;
  //   }
  //   return depth(value);
  // }

  ngOnInit() {
    this.currentRenderKeyboard = Object.keys(this.keyboardConfig)[0];
    this.switchKeyGroup = Object.keys(this.keyboardConfig);
    this.keyBtnGroup = Object.values(this.keyboardConfig);
  }

  renderKeyboard(name) {
    this.currentRenderKeyboardChange.emit((this.currentRenderKeyboard = name));
  }

  close() {
    this.visibleChange.emit((this.visible = false));
  }
}
