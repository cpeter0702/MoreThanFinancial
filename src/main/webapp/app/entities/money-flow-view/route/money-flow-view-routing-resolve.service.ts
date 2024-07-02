import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMoneyFlowView } from '../money-flow-view.model';
import { MoneyFlowViewService } from '../service/money-flow-view.service';

export const moneyFlowViewResolve = (route: ActivatedRouteSnapshot): Observable<null | IMoneyFlowView> => {
  const id = route.params['id'];
  if (id) {
    return inject(MoneyFlowViewService)
      .find(id)
      .pipe(
        mergeMap((moneyFlowView: HttpResponse<IMoneyFlowView>) => {
          if (moneyFlowView.body) {
            return of(moneyFlowView.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default moneyFlowViewResolve;
