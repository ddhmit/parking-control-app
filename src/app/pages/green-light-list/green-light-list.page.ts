import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { sample } from 'lodash';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-green-light-list',
  templateUrl: './green-light-list.page.html',
  styleUrls: ['./green-light-list.page.scss'],
})
export class GreenLightListPage implements OnInit {
  constructor(private apiService: ApiService) {}
  // 列表数据
  pageData = [];
  // 当前页最后一条id
  perpage_last_id = '';
  dateNow = Date.now();
  // 当前tab
  segment: string = '全部';

  // 上滑加载
  loadData(event) {
    this.carLoadAndUnload(event);
  }

  // 下拉刷新
  segmentChange(event?) {
    this.pageData = [];
    this.perpage_last_id = '';
    this.carLoadAndUnload(event);
  }

  carLoadAndUnload(event?) {
    let params = this.perpage_last_id
      ? {
          perpage_last_id: [this.perpage_last_id],
        }
      : {};
    this.apiService
      .carLoadAndUnload({
        search:
          this.segment == '全部'
            ? params
            : {
                operation: [this.segment],
                ...params,
              },
      })
      .subscribe(
        (res: any) => {
          const { docs } = res.data;
          if (docs.length) {
            this.perpage_last_id = docs.slice(-1)[0]._id;
            this.pageData = [...this.pageData, ...docs];
          }
          event && event.target.complete();
        },
        () => {
          event && event.target.complete();
        }
      );
  }

  totalTime(startTime = this.dateNow, endTime = this.dateNow) {
    const _moment = moment(endTime);
    const diff = _moment.diff(moment(startTime), 'days');
    const hhmmss = moment
      .utc(_moment.diff(moment(startTime)))
      .format('HH:mm:ss');
    if (!diff) {
      return hhmmss;
    }
    return `${diff}天 ${hhmmss}`;
  }

  ngOnInit() {
    this.segmentChange();
  }
}
