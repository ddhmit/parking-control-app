import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';
import { LoadingService } from 'src/app/services/loading.service';
import * as moment from 'moment';
import { HelperService } from 'src/app/services/helper.service';
import { AlertService } from 'src/app/services/alert.service';
import { Platform, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';
import { ApiService } from 'src/app/services/api.service';
import { environment } from '../../../environments/environment';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-green-light',
  templateUrl: './green-light.page.html',
  styleUrls: ['./green-light.page.scss'],
})
export class GreenLightPage implements OnInit {
  constructor(
    private router: Router,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private storeService: StoreService,
    private modalService: ModalService,
    private apiService: ApiService,
    private alertService: AlertService,
    private helperService: HelperService
  ) {}

  // 上个页面传过来的参数
  pageParams: any = {
    carInOut: '',
    carNo: '',
  };
  // 不允许返回的alert提示
  alertStatus = null;
  // 是否开始了装卸货
  isStart: boolean = false;
  // 当前操作
  curOperation: string = null;
  // 页面计时器
  pageStartTime: string;
  pageTimerTotal: string = '00:00:00';
  timer = null;
  backButtonSub;
  pageData: any = {
    _id: '',
  };

  ionViewWillLeave() {
    this.backButtonSub.unsubscribe();
    this.timer && this.timer.stop(); // 停止计时器
  }

  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.pageParams = params;
      this.getCarInOut(this.pageParams);
    });
  }

  ngOnInit() {
    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      999,
      () => {
        // 如果没有进行装卸车操作则允许返回
        if (!this.isStart) {
          return this.dismiss();
        }
        // 避免重复弹出提示框
        if (this.alertStatus) {
          return;
        }
        this.alertStatus = this.alertService
          .show({
            message:
              '当前操作未完成，您可以点击右上角“返回主页”按钮开始新的操作，之后您可以从“放行记录”中找到该记录并继续完成。',
            buttons: [
              {
                text: '确定',
                handler: () => {
                  this.alertStatus = false;
                },
              },
            ],
          })
          .then(() => {
            this.alertStatus = true;
          });
      }
    );
  }

  // 获取车辆出入记录
  getCarInOut({ carInOut, carNo }) {
    let params = {};
    if (carInOut) {
      params = {
        search: {
          _id: [carInOut],
          outAt: [null],
        },
      };
    }
    if (carNo) {
      params = {
        search: {
          carNo: [carNo],
          outAt: [null],
        },
      };
    }
    // 获取最新的一条
    this.apiService.carInAndOut({ ...params, limit: 1 }).subscribe(
      (res: any) => {
        // 系统中未查询到该车辆入场记录
        if (!res.data.totalDocs) {
          this.dismiss();
          throw {
            error: {
              msg: '未找到该车辆的入场记录',
            },
          };
        }
        this.pageData = res.data.docs[0];
        this.storeService.getObject('user').then((user) => {
          this.pageData.pathway.map((item) => {
            if (!item) {
              return;
            }
            if (item.operator._id == user._id) {
              if (item.status == '放行') {
                this.toastService.show({
                  color: 'warning',
                  message: '该车辆已完成放行操作',
                });
                this.dismiss();
              }
              if (item.status == '进行中') {
                this.pageStatus(item.operation, item.createdAt);
              }
            }
          });
        });
      },
      () => {
        this.dismiss();
      }
    );
  }

  // 装卸车放行
  carInOutOperation(params) {
    return this.apiService.carInOutOperation(params);
  }

  dismiss() {
    return this.navCtrl.pop() || this.router.navigate(['/tabs']);
    // return this.modalService.dismiss();
  }

  totalTime(startTime) {
    const _moment = moment();
    const diff = _moment.diff(moment(startTime), 'days');
    const hhmmss = moment
      .utc(_moment.diff(moment(startTime)))
      .format('HH:mm:ss');
    if (!diff) {
      return hhmmss;
    }
    return `${diff}天 ${hhmmss}`;
  }

  // 更改页面状态
  pageStatus(operation, startTime = Date.now()) {
    this.pageStartTime = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
    this.timer = this.helperService.momentTimer(
      () => {
        this.pageTimerTotal = this.totalTime(startTime);
      },
      null,
      1000
    );
    this.isStart = true;
    this.curOperation = operation;
  }

  // 开始 装卸车
  start(operation) {
    if (!this.pageData._id) {
      throw {
        error: {
          msg: '未找到该车辆的入场记录',
        },
      };
    }
    this.pageStatus(operation);
    this.carInOutOperation({
      carInOutId: this.pageData._id,
      operation: operation,
    }).subscribe();
  }

  // 结束 放行
  stop() {
    if (!this.pageData._id) {
      throw {
        error: {
          msg: '未找到该车辆的入场记录',
        },
      };
    }
    this.alertStatus = this.alertService.show({
      message:
        '请在收到货款后进行放行操作！未收到货款请勿点击放行！由于随意放行导致的财产损失由商户自行承担！',
      inputs: [
        {
          name: 'phone',
          type: 'text',
          placeholder: '请备注司机手机号',
        },
      ],
      buttons: [
        {
          text: '放行',
          handler: (form) => {
            if (
              form.phone &&
              !/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(
                form.phone
              )
            ) {
              this.toastService.show({
                color: 'danger',
                message: '手机号输入错误',
              });
              return false;
            }
            this.carInOutOperation({
              carInOutId: this.pageData._id,
              operation: this.curOperation,
              phone: form.phone,
              status: '放行',
            }).subscribe((res: any) => {
              this.alertStatus = this.alertService.show({
                header: `${this.curOperation}成功`,
                message: `本次${this.curOperation}操作已正确完成，积分+1。操作总用时：${this.pageTimerTotal}`,
                buttons: [
                  {
                    text: '返回',
                    handler: () => {
                      this.timer.stop();
                      this.dismiss();
                    },
                  },
                ],
              });
            });
          },
        },
        {
          text: '取消',
          handler: () => {
            this.alertStatus = false;
            this.timer.start();
          },
        },
      ],
    });
  }
}
