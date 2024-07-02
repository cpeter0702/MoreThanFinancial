import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { INayaxTransactions } from '../nayax-transactions.model';
import { NayaxTransactionsService } from '../service/nayax-transactions.service';

import nayaxTransactionsResolve from './nayax-transactions-routing-resolve.service';

describe('NayaxTransactions routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: NayaxTransactionsService;
  let resultNayaxTransactions: INayaxTransactions | null | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    service = TestBed.inject(NayaxTransactionsService);
    resultNayaxTransactions = undefined;
  });

  describe('resolve', () => {
    it('should return INayaxTransactions returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        nayaxTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNayaxTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNayaxTransactions).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        nayaxTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNayaxTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultNayaxTransactions).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<INayaxTransactions>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        nayaxTransactionsResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultNayaxTransactions = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultNayaxTransactions).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
