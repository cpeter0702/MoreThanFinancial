import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IMoneyFlowView } from '../money-flow-view.model';
import { MoneyFlowViewService } from '../service/money-flow-view.service';

import moneyFlowViewResolve from './money-flow-view-routing-resolve.service';

describe('MoneyFlowView routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let service: MoneyFlowViewService;
  let resultMoneyFlowView: IMoneyFlowView | null | undefined;

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
    service = TestBed.inject(MoneyFlowViewService);
    resultMoneyFlowView = undefined;
  });

  describe('resolve', () => {
    it('should return IMoneyFlowView returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        moneyFlowViewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultMoneyFlowView = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMoneyFlowView).toEqual({ id: 123 });
    });

    it('should return null if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      TestBed.runInInjectionContext(() => {
        moneyFlowViewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultMoneyFlowView = result;
          },
        });
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultMoneyFlowView).toEqual(null);
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse<IMoneyFlowView>({ body: null })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      TestBed.runInInjectionContext(() => {
        moneyFlowViewResolve(mockActivatedRouteSnapshot).subscribe({
          next(result) {
            resultMoneyFlowView = result;
          },
        });
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultMoneyFlowView).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
