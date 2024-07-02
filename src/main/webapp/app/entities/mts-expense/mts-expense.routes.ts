import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MtsExpenseComponent } from './list/mts-expense.component';
import { MtsExpenseDetailComponent } from './detail/mts-expense-detail.component';
import { MtsExpenseUpdateComponent } from './update/mts-expense-update.component';
import MtsExpenseResolve from './route/mts-expense-routing-resolve.service';

const mtsExpenseRoute: Routes = [
  {
    path: '',
    component: MtsExpenseComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MtsExpenseDetailComponent,
    resolve: {
      mtsExpense: MtsExpenseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MtsExpenseUpdateComponent,
    resolve: {
      mtsExpense: MtsExpenseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MtsExpenseUpdateComponent,
    resolve: {
      mtsExpense: MtsExpenseResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default mtsExpenseRoute;
