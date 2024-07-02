import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { NayaxTransactionsComponent } from './list/nayax-transactions.component';
import { NayaxTransactionsDetailComponent } from './detail/nayax-transactions-detail.component';
import { NayaxTransactionsUpdateComponent } from './update/nayax-transactions-update.component';
import NayaxTransactionsResolve from './route/nayax-transactions-routing-resolve.service';

const nayaxTransactionsRoute: Routes = [
  {
    path: '',
    component: NayaxTransactionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NayaxTransactionsDetailComponent,
    resolve: {
      nayaxTransactions: NayaxTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NayaxTransactionsUpdateComponent,
    resolve: {
      nayaxTransactions: NayaxTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NayaxTransactionsUpdateComponent,
    resolve: {
      nayaxTransactions: NayaxTransactionsResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default nayaxTransactionsRoute;
