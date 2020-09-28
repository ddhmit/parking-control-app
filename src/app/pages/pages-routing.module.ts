import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'staff',
        loadChildren: () =>
          import('./staff/staff.module').then((m) => m.StaffPageModule),
      },
      // {
      //   path: 'recharge',
      //   loadChildren: () =>
      //     import('./recharge/recharge.module').then(
      //       (m) => m.RechargePageModule
      //     ),
      // },
      // {
      //   path: 'car',
      //   loadChildren: () =>
      //     import('./car/car.module').then((m) => m.CarPageModule),
      // },
      {
        path: 'merchant-info',
        loadChildren: () =>
          import('./merchant-info/merchant-info.module').then(
            (m) => m.MerchantInfoPageModule
          ),
      },
      // {
      //   path: 'recharge-log',
      //   loadChildren: () =>
      //     import('./recharge-log/recharge-log.module').then(
      //       (m) => m.RechargeLogPageModule
      //     ),
      // },
      {
        path: 'qr-scanner',
        loadChildren: () =>
          import('./qr-scanner/qr-scanner.module').then(
            (m) => m.QrScannerPageModule
          ),
      },
      {
        path: 'my-info',
        loadChildren: () =>
          import('./my-info/my-info.module').then((m) => m.MyInfoPageModule),
      },
      {
        path: '',
        redirectTo: '/pages/my-info',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
