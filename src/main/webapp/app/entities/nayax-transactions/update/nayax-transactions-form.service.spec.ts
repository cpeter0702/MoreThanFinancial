import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../nayax-transactions.test-samples';

import { NayaxTransactionsFormService } from './nayax-transactions-form.service';

describe('NayaxTransactions Form Service', () => {
  let service: NayaxTransactionsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NayaxTransactionsFormService);
  });

  describe('Service methods', () => {
    describe('createNayaxTransactionsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNayaxTransactionsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            siteID: expect.any(Object),
            transactionID: expect.any(Object),
            paymentMethodID: expect.any(Object),
            currency: expect.any(Object),
            machineName: expect.any(Object),
            authorizationValue: expect.any(Object),
            campaignID: expect.any(Object),
            settlementValue: expect.any(Object),
            productSelectionInfo: expect.any(Object),
            cardNumber: expect.any(Object),
            authrizationRRN: expect.any(Object),
            machineAuthorizationTime: expect.any(Object),
            machineSettlementTime: expect.any(Object),
            creditCardType: expect.any(Object),
            cardType: expect.any(Object),
            paymentMethod: expect.any(Object),
            transactionStatusID: expect.any(Object),
            transactionTypeID: expect.any(Object),
            billingProvider: expect.any(Object),
            prepaidCardHolderName: expect.any(Object),
            refundRequestBy: expect.any(Object),
            refundRequestDate: expect.any(Object),
            refundReason: expect.any(Object),
          }),
        );
      });

      it('passing INayaxTransactions should create a new form with FormGroup', () => {
        const formGroup = service.createNayaxTransactionsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            siteID: expect.any(Object),
            transactionID: expect.any(Object),
            paymentMethodID: expect.any(Object),
            currency: expect.any(Object),
            machineName: expect.any(Object),
            authorizationValue: expect.any(Object),
            campaignID: expect.any(Object),
            settlementValue: expect.any(Object),
            productSelectionInfo: expect.any(Object),
            cardNumber: expect.any(Object),
            authrizationRRN: expect.any(Object),
            machineAuthorizationTime: expect.any(Object),
            machineSettlementTime: expect.any(Object),
            creditCardType: expect.any(Object),
            cardType: expect.any(Object),
            paymentMethod: expect.any(Object),
            transactionStatusID: expect.any(Object),
            transactionTypeID: expect.any(Object),
            billingProvider: expect.any(Object),
            prepaidCardHolderName: expect.any(Object),
            refundRequestBy: expect.any(Object),
            refundRequestDate: expect.any(Object),
            refundReason: expect.any(Object),
          }),
        );
      });
    });

    describe('getNayaxTransactions', () => {
      it('should return NewNayaxTransactions for default NayaxTransactions initial value', () => {
        const formGroup = service.createNayaxTransactionsFormGroup(sampleWithNewData);

        const nayaxTransactions = service.getNayaxTransactions(formGroup) as any;

        expect(nayaxTransactions).toMatchObject(sampleWithNewData);
      });

      it('should return NewNayaxTransactions for empty NayaxTransactions initial value', () => {
        const formGroup = service.createNayaxTransactionsFormGroup();

        const nayaxTransactions = service.getNayaxTransactions(formGroup) as any;

        expect(nayaxTransactions).toMatchObject({});
      });

      it('should return INayaxTransactions', () => {
        const formGroup = service.createNayaxTransactionsFormGroup(sampleWithRequiredData);

        const nayaxTransactions = service.getNayaxTransactions(formGroup) as any;

        expect(nayaxTransactions).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INayaxTransactions should not enable id FormControl', () => {
        const formGroup = service.createNayaxTransactionsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNayaxTransactions should disable id FormControl', () => {
        const formGroup = service.createNayaxTransactionsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
