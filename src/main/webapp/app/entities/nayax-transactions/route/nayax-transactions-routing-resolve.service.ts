import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INayaxTransactions } from '../nayax-transactions.model';
import { NayaxTransactionsService } from '../service/nayax-transactions.service';

export const nayaxTransactionsResolve = (route: ActivatedRouteSnapshot): Observable<null | INayaxTransactions> => {
  const id = route.params['id'];
  if (id) {
    return inject(NayaxTransactionsService)
      .find(id)
      .pipe(
        mergeMap((nayaxTransactions: HttpResponse<INayaxTransactions>) => {
          if (nayaxTransactions.body) {
            return of(nayaxTransactions.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default nayaxTransactionsResolve;
