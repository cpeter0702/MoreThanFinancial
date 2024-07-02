import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IMtsIncome } from '../mts-income.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../mts-income.test-samples';

import { MtsIncomeService, RestMtsIncome } from './mts-income.service';

const requireRestSample: RestMtsIncome = {
  ...sampleWithRequiredData,
  incomeDate: sampleWithRequiredData.incomeDate?.toJSON(),
  modifyDatetime: sampleWithRequiredData.modifyDatetime?.toJSON(),
  createDatetime: sampleWithRequiredData.createDatetime?.toJSON(),
};

describe('MtsIncome Service', () => {
  let service: MtsIncomeService;
  let httpMock: HttpTestingController;
  let expectedResult: IMtsIncome | IMtsIncome[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(MtsIncomeService);
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

    it('should create a MtsIncome', () => {
      const mtsIncome = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(mtsIncome).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a MtsIncome', () => {
      const mtsIncome = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(mtsIncome).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a MtsIncome', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of MtsIncome', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a MtsIncome', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMtsIncomeToCollectionIfMissing', () => {
      it('should add a MtsIncome to an empty array', () => {
        const mtsIncome: IMtsIncome = sampleWithRequiredData;
        expectedResult = service.addMtsIncomeToCollectionIfMissing([], mtsIncome);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mtsIncome);
      });

      it('should not add a MtsIncome to an array that contains it', () => {
        const mtsIncome: IMtsIncome = sampleWithRequiredData;
        const mtsIncomeCollection: IMtsIncome[] = [
          {
            ...mtsIncome,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMtsIncomeToCollectionIfMissing(mtsIncomeCollection, mtsIncome);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a MtsIncome to an array that doesn't contain it", () => {
        const mtsIncome: IMtsIncome = sampleWithRequiredData;
        const mtsIncomeCollection: IMtsIncome[] = [sampleWithPartialData];
        expectedResult = service.addMtsIncomeToCollectionIfMissing(mtsIncomeCollection, mtsIncome);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mtsIncome);
      });

      it('should add only unique MtsIncome to an array', () => {
        const mtsIncomeArray: IMtsIncome[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const mtsIncomeCollection: IMtsIncome[] = [sampleWithRequiredData];
        expectedResult = service.addMtsIncomeToCollectionIfMissing(mtsIncomeCollection, ...mtsIncomeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const mtsIncome: IMtsIncome = sampleWithRequiredData;
        const mtsIncome2: IMtsIncome = sampleWithPartialData;
        expectedResult = service.addMtsIncomeToCollectionIfMissing([], mtsIncome, mtsIncome2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(mtsIncome);
        expect(expectedResult).toContain(mtsIncome2);
      });

      it('should accept null and undefined values', () => {
        const mtsIncome: IMtsIncome = sampleWithRequiredData;
        expectedResult = service.addMtsIncomeToCollectionIfMissing([], null, mtsIncome, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(mtsIncome);
      });

      it('should return initial array if no MtsIncome is added', () => {
        const mtsIncomeCollection: IMtsIncome[] = [sampleWithRequiredData];
        expectedResult = service.addMtsIncomeToCollectionIfMissing(mtsIncomeCollection, undefined, null);
        expect(expectedResult).toEqual(mtsIncomeCollection);
      });
    });

    describe('compareMtsIncome', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMtsIncome(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMtsIncome(entity1, entity2);
        const compareResult2 = service.compareMtsIncome(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMtsIncome(entity1, entity2);
        const compareResult2 = service.compareMtsIncome(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMtsIncome(entity1, entity2);
        const compareResult2 = service.compareMtsIncome(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
