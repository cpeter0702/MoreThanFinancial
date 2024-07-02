import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { INayaxTransactions, NewNayaxTransactions } from '../nayax-transactions.model';

export type PartialUpdateNayaxTransactions = Partial<INayaxTransactions> & Pick<INayaxTransactions, 'id'>;

type RestOf<T extends INayaxTransactions | NewNayaxTransactions> = Omit<
  T,
  'machineAuthorizationTime' | 'machineSettlementTime' | 'refundRequestDate'
> & {
  machineAuthorizationTime?: string | null;
  machineSettlementTime?: string | null;
  refundRequestDate?: string | null;
};

export type RestNayaxTransactions = RestOf<INayaxTransactions>;

export type NewRestNayaxTransactions = RestOf<NewNayaxTransactions>;

export type PartialUpdateRestNayaxTransactions = RestOf<PartialUpdateNayaxTransactions>;

export type EntityResponseType = HttpResponse<INayaxTransactions>;
export type EntityArrayResponseType = HttpResponse<INayaxTransactions[]>;

@Injectable({ providedIn: 'root' })
export class NayaxTransactionsService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/nayax-transactions');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
  ) {}

  create(nayaxTransactions: NewNayaxTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nayaxTransactions);
    return this.http
      .post<RestNayaxTransactions>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(nayaxTransactions: INayaxTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nayaxTransactions);
    return this.http
      .put<RestNayaxTransactions>(`${this.resourceUrl}/${this.getNayaxTransactionsIdentifier(nayaxTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(nayaxTransactions: PartialUpdateNayaxTransactions): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(nayaxTransactions);
    return this.http
      .patch<RestNayaxTransactions>(`${this.resourceUrl}/${this.getNayaxTransactionsIdentifier(nayaxTransactions)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestNayaxTransactions>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestNayaxTransactions[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getNayaxTransactionsIdentifier(nayaxTransactions: Pick<INayaxTransactions, 'id'>): number {
    return nayaxTransactions.id;
  }

  compareNayaxTransactions(o1: Pick<INayaxTransactions, 'id'> | null, o2: Pick<INayaxTransactions, 'id'> | null): boolean {
    return o1 && o2 ? this.getNayaxTransactionsIdentifier(o1) === this.getNayaxTransactionsIdentifier(o2) : o1 === o2;
  }

  addNayaxTransactionsToCollectionIfMissing<Type extends Pick<INayaxTransactions, 'id'>>(
    nayaxTransactionsCollection: Type[],
    ...nayaxTransactionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const nayaxTransactions: Type[] = nayaxTransactionsToCheck.filter(isPresent);
    if (nayaxTransactions.length > 0) {
      const nayaxTransactionsCollectionIdentifiers = nayaxTransactionsCollection.map(
        nayaxTransactionsItem => this.getNayaxTransactionsIdentifier(nayaxTransactionsItem)!,
      );
      const nayaxTransactionsToAdd = nayaxTransactions.filter(nayaxTransactionsItem => {
        const nayaxTransactionsIdentifier = this.getNayaxTransactionsIdentifier(nayaxTransactionsItem);
        if (nayaxTransactionsCollectionIdentifiers.includes(nayaxTransactionsIdentifier)) {
          return false;
        }
        nayaxTransactionsCollectionIdentifiers.push(nayaxTransactionsIdentifier);
        return true;
      });
      return [...nayaxTransactionsToAdd, ...nayaxTransactionsCollection];
    }
    return nayaxTransactionsCollection;
  }

  protected convertDateFromClient<T extends INayaxTransactions | NewNayaxTransactions | PartialUpdateNayaxTransactions>(
    nayaxTransactions: T,
  ): RestOf<T> {
    return {
      ...nayaxTransactions,
      machineAuthorizationTime: nayaxTransactions.machineAuthorizationTime?.toJSON() ?? null,
      machineSettlementTime: nayaxTransactions.machineSettlementTime?.toJSON() ?? null,
      refundRequestDate: nayaxTransactions.refundRequestDate?.toJSON() ?? null,
    };
  }

  protected convertDateFromServer(restNayaxTransactions: RestNayaxTransactions): INayaxTransactions {
    return {
      ...restNayaxTransactions,
      machineAuthorizationTime: restNayaxTransactions.machineAuthorizationTime
        ? dayjs(restNayaxTransactions.machineAuthorizationTime)
        : undefined,
      machineSettlementTime: restNayaxTransactions.machineSettlementTime ? dayjs(restNayaxTransactions.machineSettlementTime) : undefined,
      refundRequestDate: restNayaxTransactions.refundRequestDate ? dayjs(restNayaxTransactions.refundRequestDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestNayaxTransactions>): HttpResponse<INayaxTransactions> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestNayaxTransactions[]>): HttpResponse<INayaxTransactions[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
