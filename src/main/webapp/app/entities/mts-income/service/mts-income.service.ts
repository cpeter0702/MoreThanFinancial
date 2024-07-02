import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMtsIncome, NewMtsIncome } from '../mts-income.model';

export type PartialUpdateMtsIncome = Partial<IMtsIncome> & Pick<IMtsIncome, 'id'>;

type RestOf<T extends IMtsIncome | NewMtsIncome> = Omit<T, 'incomeDate' | 'modifyDatetime' | 'createDatetime'> & {
  incomeDate?: string | null;
  modifyDatetime?: string | null;
  createDatetime?: string | null;
};

export type RestMtsIncome = RestOf<IMtsIncome>;

export type NewRestMtsIncome = RestOf<NewMtsIncome>;

export type PartialUpdateRestMtsIncome = RestOf<PartialUpdateMtsIncome>;

export type EntityResponseType = HttpResponse<IMtsIncome>;
export type EntityArrayResponseType = HttpResponse<IMtsIncome[]>;

@Injectable({ providedIn: 'root' })
export class MtsIncomeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/mts-incomes');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(mtsIncome: NewMtsIncome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsIncome);
    return this.http
      .post<RestMtsIncome>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(mtsIncome: IMtsIncome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsIncome);
    return this.http
      .put<RestMtsIncome>(`${this.resourceUrl}/${this.getMtsIncomeIdentifier(mtsIncome)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(mtsIncome: PartialUpdateMtsIncome): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mtsIncome);
    return this.http
      .patch<RestMtsIncome>(`${this.resourceUrl}/${this.getMtsIncomeIdentifier(mtsIncome)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMtsIncome>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMtsIncome[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMtsIncomeIdentifier(mtsIncome: Pick<IMtsIncome, 'id'>): number {
    return mtsIncome.id;
  }

  compareMtsIncome(o1: Pick<IMtsIncome, 'id'> | null, o2: Pick<IMtsIncome, 'id'> | null): boolean {
    return o1 && o2 ? this.getMtsIncomeIdentifier(o1) === this.getMtsIncomeIdentifier(o2) : o1 === o2;
  }

  addMtsIncomeToCollectionIfMissing<Type extends Pick<IMtsIncome, 'id'>>(
    mtsIncomeCollection: Type[],
    ...mtsIncomesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const mtsIncomes: Type[] = mtsIncomesToCheck.filter(isPresent);
    if (mtsIncomes.length > 0) {
      const mtsIncomeCollectionIdentifiers = mtsIncomeCollection.map(mtsIncomeItem => this.getMtsIncomeIdentifier(mtsIncomeItem)!);
      const mtsIncomesToAdd = mtsIncomes.filter(mtsIncomeItem => {
        const mtsIncomeIdentifier = this.getMtsIncomeIdentifier(mtsIncomeItem);
        if (mtsIncomeCollectionIdentifiers.includes(mtsIncomeIdentifier)) {
          return false;
        }
        mtsIncomeCollectionIdentifiers.push(mtsIncomeIdentifier);
        return true;
      });
      return [...mtsIncomesToAdd, ...mtsIncomeCollection];
    }
    return mtsIncomeCollection;
  }

  protected convertDateFromClient<T extends IMtsIncome | NewMtsIncome | PartialUpdateMtsIncome>(mtsIncome: T): RestOf<T> {
    return {
      ...mtsIncome,
      incomeDate: mtsIncome.incomeDate?.toJSON() ?? null,
      modifyDatetime: mtsIncome.modifyDatetime?.toJSON() ?? null,
      createDatetime: mtsIncome.createDatetime?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMtsIncome: RestMtsIncome): IMtsIncome {
    return {
      ...restMtsIncome,
      incomeDate: restMtsIncome.incomeDate ? dayjs(restMtsIncome.incomeDate) : undefined,
      modifyDatetime: restMtsIncome.modifyDatetime ? dayjs(restMtsIncome.modifyDatetime) : undefined,
      createDatetime: restMtsIncome.createDatetime ? dayjs(restMtsIncome.createDatetime) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMtsIncome>): HttpResponse<IMtsIncome> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMtsIncome[]>): HttpResponse<IMtsIncome[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
