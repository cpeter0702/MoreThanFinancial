import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mts-income.test-samples';

import { MtsIncomeFormService } from './mts-income-form.service';

describe('MtsIncome Form Service', () => {
  let service: MtsIncomeFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtsIncomeFormService);
  });

  describe('Service methods', () => {
    describe('createMtsIncomeFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMtsIncomeFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            incomeDate: expect.any(Object),
            incomeAmount: expect.any(Object),
            incomeType: expect.any(Object),
            incomeTypeDetail: expect.any(Object),
            incomePayer: expect.any(Object),
            incomeReceiver: expect.any(Object),
            incomeRemark: expect.any(Object),
            isActive: expect.any(Object),
            modifier: expect.any(Object),
            modifyDatetime: expect.any(Object),
            creator: expect.any(Object),
            createDatetime: expect.any(Object),
          }),
        );
      });

      it('passing IMtsIncome should create a new form with FormGroup', () => {
        const formGroup = service.createMtsIncomeFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            incomeDate: expect.any(Object),
            incomeAmount: expect.any(Object),
            incomeType: expect.any(Object),
            incomeTypeDetail: expect.any(Object),
            incomePayer: expect.any(Object),
            incomeReceiver: expect.any(Object),
            incomeRemark: expect.any(Object),
            isActive: expect.any(Object),
            modifier: expect.any(Object),
            modifyDatetime: expect.any(Object),
            creator: expect.any(Object),
            createDatetime: expect.any(Object),
          }),
        );
      });
    });

    describe('getMtsIncome', () => {
      it('should return NewMtsIncome for default MtsIncome initial value', () => {
        const formGroup = service.createMtsIncomeFormGroup(sampleWithNewData);

        const mtsIncome = service.getMtsIncome(formGroup) as any;

        expect(mtsIncome).toMatchObject(sampleWithNewData);
      });

      it('should return NewMtsIncome for empty MtsIncome initial value', () => {
        const formGroup = service.createMtsIncomeFormGroup();

        const mtsIncome = service.getMtsIncome(formGroup) as any;

        expect(mtsIncome).toMatchObject({});
      });

      it('should return IMtsIncome', () => {
        const formGroup = service.createMtsIncomeFormGroup(sampleWithRequiredData);

        const mtsIncome = service.getMtsIncome(formGroup) as any;

        expect(mtsIncome).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMtsIncome should not enable id FormControl', () => {
        const formGroup = service.createMtsIncomeFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMtsIncome should disable id FormControl', () => {
        const formGroup = service.createMtsIncomeFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
