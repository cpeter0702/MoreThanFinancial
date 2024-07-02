import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMtsExpense, NewMtsExpense } from '../mts-expense.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMtsExpense for edit and NewMtsExpenseFormGroupInput for create.
 */
type MtsExpenseFormGroupInput = IMtsExpense | PartialWithRequiredKeyOf<NewMtsExpense>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMtsExpense | NewMtsExpense> = Omit<T, 'expenseDate' | 'modifyDatetime' | 'createDatetime'> & {
  expenseDate?: string | null;
  modifyDatetime?: string | null;
  createDatetime?: string | null;
};

type MtsExpenseFormRawValue = FormValueOf<IMtsExpense>;

type NewMtsExpenseFormRawValue = FormValueOf<NewMtsExpense>;

type MtsExpenseFormDefaults = Pick<NewMtsExpense, 'id' | 'expenseDate' | 'isActive' | 'modifyDatetime' | 'createDatetime'>;

type MtsExpenseFormGroupContent = {
  id: FormControl<MtsExpenseFormRawValue['id'] | NewMtsExpense['id']>;
  expenseDate: FormControl<MtsExpenseFormRawValue['expenseDate']>;
  expenseAmount: FormControl<MtsExpenseFormRawValue['expenseAmount']>;
  expenseType: FormControl<MtsExpenseFormRawValue['expenseType']>;
  expenseTypeDetail: FormControl<MtsExpenseFormRawValue['expenseTypeDetail']>;
  expensePayer: FormControl<MtsExpenseFormRawValue['expensePayer']>;
  expenseReceiver: FormControl<MtsExpenseFormRawValue['expenseReceiver']>;
  expenseRemark: FormControl<MtsExpenseFormRawValue['expenseRemark']>;
  expenseReceipt: FormControl<MtsExpenseFormRawValue['expenseReceipt']>;
  expenseReceiptContentType: FormControl<MtsExpenseFormRawValue['expenseReceiptContentType']>;
  isActive: FormControl<MtsExpenseFormRawValue['isActive']>;
  modifier: FormControl<MtsExpenseFormRawValue['modifier']>;
  modifyDatetime: FormControl<MtsExpenseFormRawValue['modifyDatetime']>;
  creator: FormControl<MtsExpenseFormRawValue['creator']>;
  createDatetime: FormControl<MtsExpenseFormRawValue['createDatetime']>;
};

export type MtsExpenseFormGroup = FormGroup<MtsExpenseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MtsExpenseFormService {
  createMtsExpenseFormGroup(mtsExpense: MtsExpenseFormGroupInput = { id: null }): MtsExpenseFormGroup {
    const mtsExpenseRawValue = this.convertMtsExpenseToMtsExpenseRawValue({
      ...this.getFormDefaults(),
      ...mtsExpense,
    });
    return new FormGroup<MtsExpenseFormGroupContent>({
      id: new FormControl(
        { value: mtsExpenseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      expenseDate: new FormControl(mtsExpenseRawValue.expenseDate, {
        validators: [Validators.required],
      }),
      expenseAmount: new FormControl(mtsExpenseRawValue.expenseAmount, {
        validators: [Validators.required],
      }),
      expenseType: new FormControl(mtsExpenseRawValue.expenseType),
      expenseTypeDetail: new FormControl(mtsExpenseRawValue.expenseTypeDetail),
      expensePayer: new FormControl(mtsExpenseRawValue.expensePayer),
      expenseReceiver: new FormControl(mtsExpenseRawValue.expenseReceiver),
      expenseRemark: new FormControl(mtsExpenseRawValue.expenseRemark),
      expenseReceipt: new FormControl(mtsExpenseRawValue.expenseReceipt),
      expenseReceiptContentType: new FormControl(mtsExpenseRawValue.expenseReceiptContentType),
      isActive: new FormControl(mtsExpenseRawValue.isActive),
      modifier: new FormControl(mtsExpenseRawValue.modifier),
      modifyDatetime: new FormControl(mtsExpenseRawValue.modifyDatetime),
      creator: new FormControl(mtsExpenseRawValue.creator),
      createDatetime: new FormControl(mtsExpenseRawValue.createDatetime),
    });
  }

  getMtsExpense(form: MtsExpenseFormGroup): IMtsExpense | NewMtsExpense {
    return this.convertMtsExpenseRawValueToMtsExpense(form.getRawValue() as MtsExpenseFormRawValue | NewMtsExpenseFormRawValue);
  }

  resetForm(form: MtsExpenseFormGroup, mtsExpense: MtsExpenseFormGroupInput): void {
    const mtsExpenseRawValue = this.convertMtsExpenseToMtsExpenseRawValue({ ...this.getFormDefaults(), ...mtsExpense });
    form.reset(
      {
        ...mtsExpenseRawValue,
        id: { value: mtsExpenseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MtsExpenseFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      expenseDate: currentTime,
      isActive: false,
      modifyDatetime: currentTime,
      createDatetime: currentTime,
    };
  }

  private convertMtsExpenseRawValueToMtsExpense(
    rawMtsExpense: MtsExpenseFormRawValue | NewMtsExpenseFormRawValue,
  ): IMtsExpense | NewMtsExpense {
    return {
      ...rawMtsExpense,
      expenseDate: dayjs(rawMtsExpense.expenseDate, DATE_TIME_FORMAT),
      modifyDatetime: dayjs(rawMtsExpense.modifyDatetime, DATE_TIME_FORMAT),
      createDatetime: dayjs(rawMtsExpense.createDatetime, DATE_TIME_FORMAT),
    };
  }

  private convertMtsExpenseToMtsExpenseRawValue(
    mtsExpense: IMtsExpense | (Partial<NewMtsExpense> & MtsExpenseFormDefaults),
  ): MtsExpenseFormRawValue | PartialWithRequiredKeyOf<NewMtsExpenseFormRawValue> {
    return {
      ...mtsExpense,
      expenseDate: mtsExpense.expenseDate ? mtsExpense.expenseDate.format(DATE_TIME_FORMAT) : undefined,
      modifyDatetime: mtsExpense.modifyDatetime ? mtsExpense.modifyDatetime.format(DATE_TIME_FORMAT) : undefined,
      createDatetime: mtsExpense.createDatetime ? mtsExpense.createDatetime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
