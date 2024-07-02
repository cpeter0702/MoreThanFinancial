import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MtsIncomeComponent } from './list/mts-income.component';
import { MtsIncomeDetailComponent } from './detail/mts-income-detail.component';
import { MtsIncomeUpdateComponent } from './update/mts-income-update.component';
import MtsIncomeResolve from './route/mts-income-routing-resolve.service';

const mtsIncomeRoute: Routes = [
  {
    path: '',
    component: MtsIncomeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MtsIncomeDetailComponent,
    resolve: {
      mtsIncome: MtsIncomeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MtsIncomeUpdateComponent,
    resolve: {
      mtsIncome: MtsIncomeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MtsIncomeUpdateComponent,
    resolve: {
      mtsIncome: MtsIncomeResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default mtsIncomeRoute;
