import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMoneyFlowView, NewMoneyFlowView } from '../money-flow-view.model';

export type PartialUpdateMoneyFlowView = Partial<IMoneyFlowView> & Pick<IMoneyFlowView, 'id'>;

type RestOf<T extends IMoneyFlowView | NewMoneyFlowView> = Omit<T, 'businessDate'> & {
  businessDate?: string | null;
};

export type RestMoneyFlowView = RestOf<IMoneyFlowView>;

export type NewRestMoneyFlowView = RestOf<NewMoneyFlowView>;

export type PartialUpdateRestMoneyFlowView = RestOf<PartialUpdateMoneyFlowView>;

export type EntityResponseType = HttpResponse<IMoneyFlowView>;
export type EntityArrayResponseType = HttpResponse<IMoneyFlowView[]>;

@Injectable({ providedIn: 'root' })
export class MoneyFlowViewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/money-flow-views');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(moneyFlowView: NewMoneyFlowView): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(moneyFlowView);
    return this.http
      .post<RestMoneyFlowView>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(moneyFlowView: IMoneyFlowView): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(moneyFlowView);
    return this.http
      .put<RestMoneyFlowView>(`${this.resourceUrl}/${this.getMoneyFlowViewIdentifier(moneyFlowView)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(moneyFlowView: PartialUpdateMoneyFlowView): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(moneyFlowView);
    return this.http
      .patch<RestMoneyFlowView>(`${this.resourceUrl}/${this.getMoneyFlowViewIdentifier(moneyFlowView)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestMoneyFlowView>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestMoneyFlowView[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getMoneyFlowViewIdentifier(moneyFlowView: Pick<IMoneyFlowView, 'id'>): number {
    return moneyFlowView.id;
  }

  compareMoneyFlowView(o1: Pick<IMoneyFlowView, 'id'> | null, o2: Pick<IMoneyFlowView, 'id'> | null): boolean {
    return o1 && o2 ? this.getMoneyFlowViewIdentifier(o1) === this.getMoneyFlowViewIdentifier(o2) : o1 === o2;
  }

  addMoneyFlowViewToCollectionIfMissing<Type extends Pick<IMoneyFlowView, 'id'>>(
    moneyFlowViewCollection: Type[],
    ...moneyFlowViewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const moneyFlowViews: Type[] = moneyFlowViewsToCheck.filter(isPresent);
    if (moneyFlowViews.length > 0) {
      const moneyFlowViewCollectionIdentifiers = moneyFlowViewCollection.map(
        moneyFlowViewItem => this.getMoneyFlowViewIdentifier(moneyFlowViewItem)!,
      );
      const moneyFlowViewsToAdd = moneyFlowViews.filter(moneyFlowViewItem => {
        const moneyFlowViewIdentifier = this.getMoneyFlowViewIdentifier(moneyFlowViewItem);
        if (moneyFlowViewCollectionIdentifiers.includes(moneyFlowViewIdentifier)) {
          return false;
        }
        moneyFlowViewCollectionIdentifiers.push(moneyFlowViewIdentifier);
        return true;
      });
      return [...moneyFlowViewsToAdd, ...moneyFlowViewCollection];
    }
    return moneyFlowViewCollection;
  }

  protected convertDateFromClient<T extends IMoneyFlowView | NewMoneyFlowView | PartialUpdateMoneyFlowView>(moneyFlowView: T): RestOf<T> {
    return {
      ...moneyFlowView,
      businessDate: moneyFlowView.businessDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restMoneyFlowView: RestMoneyFlowView): IMoneyFlowView {
    return {
      ...restMoneyFlowView,
      businessDate: restMoneyFlowView.businessDate ? dayjs(restMoneyFlowView.businessDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestMoneyFlowView>): HttpResponse<IMoneyFlowView> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestMoneyFlowView[]>): HttpResponse<IMoneyFlowView[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
