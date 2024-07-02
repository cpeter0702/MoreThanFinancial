import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { MoneyFlowViewComponent } from './list/money-flow-view.component';
import { MoneyFlowViewDetailComponent } from './detail/money-flow-view-detail.component';
import { MoneyFlowViewUpdateComponent } from './update/money-flow-view-update.component';
import MoneyFlowViewResolve from './route/money-flow-view-routing-resolve.service';

const moneyFlowViewRoute: Routes = [
  {
    path: '',
    component: MoneyFlowViewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MoneyFlowViewDetailComponent,
    resolve: {
      moneyFlowView: MoneyFlowViewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MoneyFlowViewUpdateComponent,
    resolve: {
      moneyFlowView: MoneyFlowViewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MoneyFlowViewUpdateComponent,
    resolve: {
      moneyFlowView: MoneyFlowViewResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default moneyFlowViewRoute;
