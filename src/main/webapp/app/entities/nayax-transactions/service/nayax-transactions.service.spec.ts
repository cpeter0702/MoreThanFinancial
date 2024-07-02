import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { INayaxTransactions } from '../nayax-transactions.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../nayax-transactions.test-samples';

import { NayaxTransactionsService, RestNayaxTransactions } from './nayax-transactions.service';

const requireRestSample: RestNayaxTransactions = {
  ...sampleWithRequiredData,
  machineAuthorizationTime: sampleWithRequiredData.machineAuthorizationTime?.toJSON(),
  machineSettlementTime: sampleWithRequiredData.machineSettlementTime?.toJSON(),
  refundRequestDate: sampleWithRequiredData.refundRequestDate?.toJSON(),
};

describe('NayaxTransactions Service', () => {
  let service: NayaxTransactionsService;
  let httpMock: HttpTestingController;
  let expectedResult: INayaxTransactions | INayaxTransactions[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(NayaxTransactionsService);
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

    it('should create a NayaxTransactions', () => {
      const nayaxTransactions = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(nayaxTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a NayaxTransactions', () => {
      const nayaxTransactions = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(nayaxTransactions).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a NayaxTransactions', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of NayaxTransactions', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a NayaxTransactions', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addNayaxTransactionsToCollectionIfMissing', () => {
      it('should add a NayaxTransactions to an empty array', () => {
        const nayaxTransactions: INayaxTransactions = sampleWithRequiredData;
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing([], nayaxTransactions);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nayaxTransactions);
      });

      it('should not add a NayaxTransactions to an array that contains it', () => {
        const nayaxTransactions: INayaxTransactions = sampleWithRequiredData;
        const nayaxTransactionsCollection: INayaxTransactions[] = [
          {
            ...nayaxTransactions,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing(nayaxTransactionsCollection, nayaxTransactions);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a NayaxTransactions to an array that doesn't contain it", () => {
        const nayaxTransactions: INayaxTransactions = sampleWithRequiredData;
        const nayaxTransactionsCollection: INayaxTransactions[] = [sampleWithPartialData];
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing(nayaxTransactionsCollection, nayaxTransactions);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nayaxTransactions);
      });

      it('should add only unique NayaxTransactions to an array', () => {
        const nayaxTransactionsArray: INayaxTransactions[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const nayaxTransactionsCollection: INayaxTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing(nayaxTransactionsCollection, ...nayaxTransactionsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const nayaxTransactions: INayaxTransactions = sampleWithRequiredData;
        const nayaxTransactions2: INayaxTransactions = sampleWithPartialData;
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing([], nayaxTransactions, nayaxTransactions2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(nayaxTransactions);
        expect(expectedResult).toContain(nayaxTransactions2);
      });

      it('should accept null and undefined values', () => {
        const nayaxTransactions: INayaxTransactions = sampleWithRequiredData;
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing([], null, nayaxTransactions, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(nayaxTransactions);
      });

      it('should return initial array if no NayaxTransactions is added', () => {
        const nayaxTransactionsCollection: INayaxTransactions[] = [sampleWithRequiredData];
        expectedResult = service.addNayaxTransactionsToCollectionIfMissing(nayaxTransactionsCollection, undefined, null);
        expect(expectedResult).toEqual(nayaxTransactionsCollection);
      });
    });

    describe('compareNayaxTransactions', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareNayaxTransactions(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareNayaxTransactions(entity1, entity2);
        const compareResult2 = service.compareNayaxTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareNayaxTransactions(entity1, entity2);
        const compareResult2 = service.compareNayaxTransactions(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareNayaxTransactions(entity1, entity2);
        const compareResult2 = service.compareNayaxTransactions(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
