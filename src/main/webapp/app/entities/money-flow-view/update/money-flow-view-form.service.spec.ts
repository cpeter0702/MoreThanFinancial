import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../money-flow-view.test-samples';

import { MoneyFlowViewFormService } from './money-flow-view-form.service';

describe('MoneyFlowView Form Service', () => {
  let service: MoneyFlowViewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyFlowViewFormService);
  });

  describe('Service methods', () => {
    describe('createMoneyFlowViewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMoneyFlowViewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            source: expect.any(Object),
            businessId: expect.any(Object),
            businessDate: expect.any(Object),
            businessAmt: expect.any(Object),
            businessType: expect.any(Object),
            businessTypeDetail: expect.any(Object),
            payer: expect.any(Object),
            receiver: expect.any(Object),
            remark: expect.any(Object),
            isActive: expect.any(Object),
          }),
        );
      });

      it('passing IMoneyFlowView should create a new form with FormGroup', () => {
        const formGroup = service.createMoneyFlowViewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            source: expect.any(Object),
            businessId: expect.any(Object),
            businessDate: expect.any(Object),
            businessAmt: expect.any(Object),
            businessType: expect.any(Object),
            businessTypeDetail: expect.any(Object),
            payer: expect.any(Object),
            receiver: expect.any(Object),
            remark: expect.any(Object),
            isActive: expect.any(Object),
          }),
        );
      });
    });

    describe('getMoneyFlowView', () => {
      it('should return NewMoneyFlowView for default MoneyFlowView initial value', () => {
        const formGroup = service.createMoneyFlowViewFormGroup(sampleWithNewData);

        const moneyFlowView = service.getMoneyFlowView(formGroup) as any;

        expect(moneyFlowView).toMatchObject(sampleWithNewData);
      });

      it('should return NewMoneyFlowView for empty MoneyFlowView initial value', () => {
        const formGroup = service.createMoneyFlowViewFormGroup();

        const moneyFlowView = service.getMoneyFlowView(formGroup) as any;

        expect(moneyFlowView).toMatchObject({});
      });

      it('should return IMoneyFlowView', () => {
        const formGroup = service.createMoneyFlowViewFormGroup(sampleWithRequiredData);

        const moneyFlowView = service.getMoneyFlowView(formGroup) as any;

        expect(moneyFlowView).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMoneyFlowView should not enable id FormControl', () => {
        const formGroup = service.createMoneyFlowViewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMoneyFlowView should disable id FormControl', () => {
        const formGroup = service.createMoneyFlowViewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
