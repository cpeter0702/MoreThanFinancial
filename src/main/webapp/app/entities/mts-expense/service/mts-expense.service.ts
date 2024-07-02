import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMtsExpense, NewMtsExpense } from '../mts-expense.model';

export type PartialUpdateMtsExpense = Partial<IMtsExpense> & Pick<IMtsExpense, 'id'>;

type RestOf<T extends IMtsExpense | NewMtsExpense> = Omit<T, 'expenseDate' | 'modifyDatetime' | 'createDatetime'> & {
  expenseDate?: string | null;
  modifyDatetime?: string | null;
  createDatetime?: string | null;
};

export type RestMtsExpense = RestOf<IMtsExpense>;

export type NewRestMtsExpense = RestOf<NewMtsExpense>;

export type PartialUpdateRestMtsExpense = RestOf<PartialUpdateMtsExpense>;

export type EntityResponseType = HttpResponse<IMtsExpense>;
export type EntityArrayResponseType = HttpResponse<IMtsExpense[]>;

@Injectable({ providedIn: 'root' })
export class MtsExpenseService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mts-expenses');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(mtsExpense: NewMtsExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsExpense);
    return this.http
      .post<RestMtsExpense>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(mtsExpense: IMtsExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsExpense);
    return this.http
      .put<RestMtsExpense>(`${this.resourceUrl}/${this.getMtsExpenseIdentifier(mtsExpense)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(mtsExpense: PartialUpdateMtsExpense): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsExpense);
    return this.http
      .patch<RestMtsExpense>(`${this.resourceUrl}/${this.getMtsExpenseIdentifier(mtsExpense)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMtsExpense>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMtsExpense[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMtsExpenseIdentifier(mtsExpense: Pick<IMtsExpense, 'id'>): number {
    return mtsExpense.id;
  }

  compareMtsExpense(o1: Pick<IMtsExpense, 'id'> | null, o2: Pick<IMtsExpense, 'id'> | null): boolean {
    return o1 && o2 ? this.getMtsExpenseIdentifier(o1) === this.getMtsExpenseIdentifier(o2) : o1 === o2;
  }

  addMtsExpenseToCollectionIfMissing<Type extends Pick<IMtsExpense, 'id'>>(
    mtsExpenseCollection: Type[],
    ...mtsExpensesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const mtsExpenses: Type[] = mtsExpensesToCheck.filter(isPresent);
    if (mtsExpenses.length > 0) {
      const mtsExpenseCollectionIdentifiers = mtsExpenseCollection.map(mtsExpenseItem => this.getMtsExpenseIdentifier(mtsExpenseItem)!);
      const mtsExpensesToAdd = mtsExpenses.filter(mtsExpenseItem => {
        const mtsExpenseIdentifier = this.getMtsExpenseIdentifier(mtsExpenseItem);
        if (mtsExpenseCollectionIdentifiers.includes(mtsExpenseIdentifier)) {
          return false;
        }
        mtsExpenseCollectionIdentifiers.push(mtsExpenseIdentifier);
        return true;
      });
      return [...mtsExpensesToAdd, ...mtsExpenseCollection];
    }
    return mtsExpenseCollection;
  }

  protected convertDateFromClient<T extends IMtsExpense | NewMtsExpense | PartialUpdateMtsExpense>(mtsExpense: T): RestOf<T> {
    return {
      ...mtsExpense,
      expenseDate: mtsExpense.expenseDate?.toJSON() ?? null,
      modifyDatetime: mtsExpense.modifyDatetime?.toJSON() ?? null,
      createDatetime: mtsExpense.createDatetime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMtsExpense: RestMtsExpense): IMtsExpense {
    return {
      ...restMtsExpense,
      expenseDate: restMtsExpense.expenseDate ? dayjs(restMtsExpense.expenseDate) : undefined,
      modifyDatetime: restMtsExpense.modifyDatetime ? dayjs(restMtsExpense.modifyDatetime) : undefined,
      createDatetime: restMtsExpense.createDatetime ? dayjs(restMtsExpense.createDatetime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMtsExpense>): HttpResponse<IMtsExpense> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMtsExpense[]>): HttpResponse<IMtsExpense[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
