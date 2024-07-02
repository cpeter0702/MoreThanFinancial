import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMoneyFlowView } from '../money-flow-view.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../money-flow-view.test-samples';

import { MoneyFlowViewService, RestMoneyFlowView } from './money-flow-view.service';

const requireRestSample: RestMoneyFlowView = {
  ...sampleWithRequiredData,
  businessDate: sampleWithRequiredData.businessDate?.toJSON(),
};

describe('MoneyFlowView Service', () => {
  let service: MoneyFlowViewService;
  let httpMock: HttpTestingController;
  let expectedResult: IMoneyFlowView | IMoneyFlowView[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MoneyFlowViewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a MoneyFlowView', () => {
      const moneyFlowView = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(moneyFlowView).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MoneyFlowView', () => {
      const moneyFlowView = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(moneyFlowView).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MoneyFlowView', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MoneyFlowView', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MoneyFlowView', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMoneyFlowViewToCollectionIfMissing', () => {
      it('should add a MoneyFlowView to an empty array', () => {
        const moneyFlowView: IMoneyFlowView = sampleWithRequiredData;
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing([], moneyFlowView);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(moneyFlowView);
      });

      it('should not add a MoneyFlowView to an array that contains it', () => {
        const moneyFlowView: IMoneyFlowView = sampleWithRequiredData;
        const moneyFlowViewCollection: IMoneyFlowView[] = [
          {
            ...moneyFlowView,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing(moneyFlowViewCollection, moneyFlowView);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MoneyFlowView to an array that doesn't contain it", () => {
        const moneyFlowView: IMoneyFlowView = sampleWithRequiredData;
        const moneyFlowViewCollection: IMoneyFlowView[] = [sampleWithPartialData];
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing(moneyFlowViewCollection, moneyFlowView);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(moneyFlowView);
      });

      it('should add only unique MoneyFlowView to an array', () => {
        const moneyFlowViewArray: IMoneyFlowView[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const moneyFlowViewCollection: IMoneyFlowView[] = [sampleWithRequiredData];
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing(moneyFlowViewCollection, ...moneyFlowViewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const moneyFlowView: IMoneyFlowView = sampleWithRequiredData;
        const moneyFlowView2: IMoneyFlowView = sampleWithPartialData;
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing([], moneyFlowView, moneyFlowView2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(moneyFlowView);
        expect(expectedResult).toContain(moneyFlowView2);
      });

      it('should accept null and undefined values', () => {
        const moneyFlowView: IMoneyFlowView = sampleWithRequiredData;
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing([], null, moneyFlowView, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(moneyFlowView);
      });

      it('should return initial array if no MoneyFlowView is added', () => {
        const moneyFlowViewCollection: IMoneyFlowView[] = [sampleWithRequiredData];
        expectedResult = service.addMoneyFlowViewToCollectionIfMissing(moneyFlowViewCollection, undefined, null);
        expect(expectedResult).toEqual(moneyFlowViewCollection);
      });
    });

    describe('compareMoneyFlowView', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMoneyFlowView(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMoneyFlowView(entity1, entity2);
        const compareResult2 = service.compareMoneyFlowView(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMoneyFlowView(entity1, entity2);
        const compareResult2 = service.compareMoneyFlowView(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMoneyFlowView(entity1, entity2);
        const compareResult2 = service.compareMoneyFlowView(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
