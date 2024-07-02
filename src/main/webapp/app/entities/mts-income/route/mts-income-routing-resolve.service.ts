import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMtsIncome } from '../mts-income.model';
import { MtsIncomeService } from '../service/mts-income.service';

export const mtsIncomeResolve = (route: ActivatedRouteSnapshot): Observable<null | IMtsIncome> => {
  const id = route.params['id'];
  if (id) {
    return inject(MtsIncomeService)
      .find(id)
      .pipe(
        mergeMap((mtsIncome: HttpResponse<IMtsIncome>) => {
          if (mtsIncome.body) {
            return of(mtsIncome.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default mtsIncomeResolve;
