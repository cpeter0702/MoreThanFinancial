import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMtsExpense } from '../mts-expense.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mts-expense.test-samples';

import { MtsExpenseService, RestMtsExpense } from './mts-expense.service';

const requireRestSample: RestMtsExpense = {
  ...sampleWithRequiredData,
  expenseDate: sampleWithRequiredData.expenseDate?.toJSON(),
  modifyDatetime: sampleWithRequiredData.modifyDatetime?.toJSON(),
  createDatetime: sampleWithRequiredData.createDatetime?.toJSON(),
};

describe('MtsExpense Service', () => {
  let service: MtsExpenseService;
  let httpMock: HttpTestingController;
  let expectedResult: IMtsExpense | IMtsExpense[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MtsExpenseService);
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

    it('should create a MtsExpense', () => {
      const mtsExpense = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(mtsExpense).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MtsExpense', () => {
      const mtsExpense = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(mtsExpense).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MtsExpense', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MtsExpense', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MtsExpense', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMtsExpenseToCollectionIfMissing', () => {
      it('should add a MtsExpense to an empty array', () => {
        const mtsExpense: IMtsExpense = sampleWithRequiredData;
        expectedResult = service.addMtsExpenseToCollectionIfMissing([], mtsExpense);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mtsExpense);
      });

      it('should not add a MtsExpense to an array that contains it', () => {
        const mtsExpense: IMtsExpense = sampleWithRequiredData;
        const mtsExpenseCollection: IMtsExpense[] = [
          {
            ...mtsExpense,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMtsExpenseToCollectionIfMissing(mtsExpenseCollection, mtsExpense);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MtsExpense to an array that doesn't contain it", () => {
        const mtsExpense: IMtsExpense = sampleWithRequiredData;
        const mtsExpenseCollection: IMtsExpense[] = [sampleWithPartialData];
        expectedResult = service.addMtsExpenseToCollectionIfMissing(mtsExpenseCollection, mtsExpense);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mtsExpense);
      });

      it('should add only unique MtsExpense to an array', () => {
        const mtsExpenseArray: IMtsExpense[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mtsExpenseCollection: IMtsExpense[] = [sampleWithRequiredData];
        expectedResult = service.addMtsExpenseToCollectionIfMissing(mtsExpenseCollection, ...mtsExpenseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mtsExpense: IMtsExpense = sampleWithRequiredData;
        const mtsExpense2: IMtsExpense = sampleWithPartialData;
        expectedResult = service.addMtsExpenseToCollectionIfMissing([], mtsExpense, mtsExpense2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mtsExpense);
        expect(expectedResult).toContain(mtsExpense2);
      });

      it('should accept null and undefined values', () => {
        const mtsExpense: IMtsExpense = sampleWithRequiredData;
        expectedResult = service.addMtsExpenseToCollectionIfMissing([], null, mtsExpense, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mtsExpense);
      });

      it('should return initial array if no MtsExpense is added', () => {
        const mtsExpenseCollection: IMtsExpense[] = [sampleWithRequiredData];
        expectedResult = service.addMtsExpenseToCollectionIfMissing(mtsExpenseCollection, undefined, null);
        expect(expectedResult).toEqual(mtsExpenseCollection);
      });
    });

    describe('compareMtsExpense', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMtsExpense(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMtsExpense(entity1, entity2);
        const compareResult2 = service.compareMtsExpense(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMtsExpense(entity1, entity2);
        const compareResult2 = service.compareMtsExpense(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMtsExpense(entity1, entity2);
        const compareResult2 = service.compareMtsExpense(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
