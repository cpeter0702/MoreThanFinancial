import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IMtsExpense } from '../mts-expense.model';
import { MtsExpenseService } from '../service/mts-expense.service';

export const mtsExpenseResolve = (route: ActivatedRouteSnapshot): Observable<null | IMtsExpense> => {
  const id = route.params['id'];
  if (id) {
    return inject(MtsExpenseService)
      .find(id)
      .pipe(
        mergeMap((mtsExpense: HttpResponse<IMtsExpense>) => {
          if (mtsExpense.body) {
            return of(mtsExpense.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default mtsExpenseResolve;
