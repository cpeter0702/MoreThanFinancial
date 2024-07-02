import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../mts-expense.test-samples';

import { MtsExpenseFormService } from './mts-expense-form.service';

describe('MtsExpense Form Service', () => {
  let service: MtsExpenseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtsExpenseFormService);
  });

  describe('Service methods', () => {
    describe('createMtsExpenseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMtsExpenseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            expenseDate: expect.any(Object),
            expenseAmount: expect.any(Object),
            expenseType: expect.any(Object),
            expenseTypeDetail: expect.any(Object),
            expensePayer: expect.any(Object),
            expenseReceiver: expect.any(Object),
            expenseRemark: expect.any(Object),
            expenseReceipt: expect.any(Object),
            isActive: expect.any(Object),
            modifier: expect.any(Object),
            modifyDatetime: expect.any(Object),
            creator: expect.any(Object),
            createDatetime: expect.any(Object),
          }),
        );
      });

      it('passing IMtsExpense should create a new form with FormGroup', () => {
        const formGroup = service.createMtsExpenseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            expenseDate: expect.any(Object),
            expenseAmount: expect.any(Object),
            expenseType: expect.any(Object),
            expenseTypeDetail: expect.any(Object),
            expensePayer: expect.any(Object),
            expenseReceiver: expect.any(Object),
            expenseRemark: expect.any(Object),
            expenseReceipt: expect.any(Object),
            isActive: expect.any(Object),
            modifier: expect.any(Object),
            modifyDatetime: expect.any(Object),
            creator: expect.any(Object),
            createDatetime: expect.any(Object),
          }),
        );
      });
    });

    describe('getMtsExpense', () => {
      it('should return NewMtsExpense for default MtsExpense initial value', () => {
        const formGroup = service.createMtsExpenseFormGroup(sampleWithNewData);

        const mtsExpense = service.getMtsExpense(formGroup) as any;

        expect(mtsExpense).toMatchObject(sampleWithNewData);
      });

      it('should return NewMtsExpense for empty MtsExpense initial value', () => {
        const formGroup = service.createMtsExpenseFormGroup();

        const mtsExpense = service.getMtsExpense(formGroup) as any;

        expect(mtsExpense).toMatchObject({});
      });

      it('should return IMtsExpense', () => {
        const formGroup = service.createMtsExpenseFormGroup(sampleWithRequiredData);

        const mtsExpense = service.getMtsExpense(formGroup) as any;

        expect(mtsExpense).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMtsExpense should not enable id FormControl', () => {
        const formGroup = service.createMtsExpenseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMtsExpense should disable id FormControl', () => {
        const formGroup = service.createMtsExpenseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
