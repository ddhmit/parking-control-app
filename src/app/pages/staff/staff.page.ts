import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.page.html',
  styleUrls: ['./staff.page.scss'],
})
export class StaffPage implements OnInit {
  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
    private apiService: ApiService
  ) {}

  staffList = [];
  async ngOnInit() {
    await this.staff();
  }

  // 下拉刷新
  async doRefresh(event) {
    await this.staff();
    event.target.complete();
  }

  // 获取员工列表
  async staff() {
    this.staffList = ((await this.apiService
      .staff()
      .toPromise()) as any).data.docs;
  }

  // 新增修改员工
  updateStaff(payload) {
    this.apiService.updateStaff(payload).subscribe(async (res: any) => {
      await this.staff();
    });
  }

  add() {
    this.alertService.show({
      header: '新增员工',
      message: '请填写需要新增的员工信息',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: '姓名',
        },
        {
          name: 'phone',
          type: 'text',
          placeholder: '手机号',
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: '提交',
          handler: (form) => {
            if (!form.name || !form.phone) {
              this.toastService.show({
                color: 'danger',
                message: '姓名、手机号不得为空',
              });
              return false;
            }
            if (
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
            this.updateStaff(form);
          },
        },
      ],
    });
  }

  // 删除员工
  delete(item, idx) {
    this.alertService.show({
      message: `确认将${item.name}从您的商户移除吗？`,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: '确认',
          handler: (form) => {
            this.apiService
              .deleteStaff({ user: item._id })
              .subscribe(async (res) => {
                this.staffList.splice(idx, 1);
              });
          },
        },
      ],
    });
  }
}
