import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'green-light-list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../green-light-list/green-light-list.module').then(
                (m) => m.GreenLightListPageModule
              ),
          },
        ],
      },
      {
        path: 'merchant',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../merchant/merchant.module').then(
                (m) => m.MerchantPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
