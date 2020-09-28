import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharge-log',
  templateUrl: './recharge-log.page.html',
  styleUrls: ['./recharge-log.page.scss'],
})
export class RechargeLogPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  loadData(event) {
    console.log(event);
  }

  doRefresh(event) {
    console.log(event);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  logs = [
    {
      time: '2019年03月',
      logs: [
        {
          type: '充值',
          time: '2019-03-01 12:32:32',
          amount: 100,
        },
        {
          type: '支付停车费',
          time: '2019-03-02 12:32:32',
          amount: 2,
        },
        {
          type: '充值',
          time: '2019-03-03 12:32:32',
          amount: 3,
        },
        {
          type: '支付停车费',
          time: '2019-03-04 12:32:32',
          amount: 5,
        },
        {
          type: '充值',
          time: '2019-03-05 12:32:32',
          amount: 100,
        },
      ],
    },
    {
      time: '2019年04月',
      logs: [
        {
          type: '充值',
          time: '2019-04-01 12:32:32',
          amount: 100,
        },
        {
          type: '支付停车费',
          time: '2019-04-02 12:32:32',
          amount: 2,
        },
        {
          type: '充值',
          time: '2019-04-03 12:32:32',
          amount: 3,
        },
        {
          type: '支付停车费',
          time: '2019-04-04 12:32:32',
          amount: 5,
        },
        {
          type: '充值',
          time: '2019-04-05 12:32:32',
          amount: 100,
        },
      ],
    },
    {
      time: '2019年03月',
      logs: [
        {
          type: '充值',
          time: '2019-03-01 12:32:32',
          amount: 100,
        },
        {
          type: '支付停车费',
          time: '2019-03-02 12:32:32',
          amount: 2,
        },
        {
          type: '充值',
          time: '2019-03-03 12:32:32',
          amount: 3,
        },
        {
          type: '支付停车费',
          time: '2019-03-04 12:32:32',
          amount: 5,
        },
        {
          type: '充值',
          time: '2019-03-05 12:32:32',
          amount: 100,
        },
      ],
    },
    {
      time: '2019年04月',
      logs: [
        {
          type: '充值',
          time: '2019-04-01 12:32:32',
          amount: 100,
        },
        {
          type: '支付停车费',
          time: '2019-04-02 12:32:32',
          amount: 2,
        },
        {
          type: '充值',
          time: '2019-04-03 12:32:32',
          amount: 3,
        },
        {
          type: '支付停车费',
          time: '2019-04-04 12:32:32',
          amount: 5,
        },
        {
          type: '充值',
          time: '2019-04-05 12:32:32',
          amount: 100,
        },
      ],
    },
  ];
}
