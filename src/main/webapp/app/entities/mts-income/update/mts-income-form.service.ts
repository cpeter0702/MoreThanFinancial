import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMtsIncome, NewMtsIncome } from '../mts-income.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMtsIncome for edit and NewMtsIncomeFormGroupInput for create.
 */
type MtsIncomeFormGroupInput = IMtsIncome | PartialWithRequiredKeyOf<NewMtsIncome>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMtsIncome | NewMtsIncome> = Omit<T, 'incomeDate' | 'modifyDatetime' | 'createDatetime'> & {
  incomeDate?: string | null;
  modifyDatetime?: string | null;
  createDatetime?: string | null;
};

type MtsIncomeFormRawValue = FormValueOf<IMtsIncome>;

type NewMtsIncomeFormRawValue = FormValueOf<NewMtsIncome>;

type MtsIncomeFormDefaults = Pick<NewMtsIncome, 'id' | 'incomeDate' | 'isActive' | 'modifyDatetime' | 'createDatetime'>;

type MtsIncomeFormGroupContent = {
  id: FormControl<MtsIncomeFormRawValue['id'] | NewMtsIncome['id']>;
  incomeDate: FormControl<MtsIncomeFormRawValue['incomeDate']>;
  incomeAmount: FormControl<MtsIncomeFormRawValue['incomeAmount']>;
  incomeType: FormControl<MtsIncomeFormRawValue['incomeType']>;
  incomeTypeDetail: FormControl<MtsIncomeFormRawValue['incomeTypeDetail']>;
  incomePayer: FormControl<MtsIncomeFormRawValue['incomePayer']>;
  incomeReceiver: FormControl<MtsIncomeFormRawValue['incomeReceiver']>;
  incomeRemark: FormControl<MtsIncomeFormRawValue['incomeRemark']>;
  isActive: FormControl<MtsIncomeFormRawValue['isActive']>;
  modifier: FormControl<MtsIncomeFormRawValue['modifier']>;
  modifyDatetime: FormControl<MtsIncomeFormRawValue['modifyDatetime']>;
  creator: FormControl<MtsIncomeFormRawValue['creator']>;
  createDatetime: FormControl<MtsIncomeFormRawValue['createDatetime']>;
};

export type MtsIncomeFormGroup = FormGroup<MtsIncomeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MtsIncomeFormService {
  createMtsIncomeFormGroup(mtsIncome: MtsIncomeFormGroupInput = { id: null }): MtsIncomeFormGroup {
    const mtsIncomeRawValue = this.convertMtsIncomeToMtsIncomeRawValue({
      ...this.getFormDefaults(),
      ...mtsIncome,
    });
    return new FormGroup<MtsIncomeFormGroupContent>({
      id: new FormControl(
        { value: mtsIncomeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      incomeDate: new FormControl(mtsIncomeRawValue.incomeDate, {
        validators: [Validators.required],
      }),
      incomeAmount: new FormControl(mtsIncomeRawValue.incomeAmount, {
        validators: [Validators.required],
      }),
      incomeType: new FormControl(mtsIncomeRawValue.incomeType),
      incomeTypeDetail: new FormControl(mtsIncomeRawValue.incomeTypeDetail),
      incomePayer: new FormControl(mtsIncomeRawValue.incomePayer),
      incomeReceiver: new FormControl(mtsIncomeRawValue.incomeReceiver),
      incomeRemark: new FormControl(mtsIncomeRawValue.incomeRemark),
      isActive: new FormControl(mtsIncomeRawValue.isActive),
      modifier: new FormControl(mtsIncomeRawValue.modifier),
      modifyDatetime: new FormControl(mtsIncomeRawValue.modifyDatetime),
      creator: new FormControl(mtsIncomeRawValue.creator),
      createDatetime: new FormControl(mtsIncomeRawValue.createDatetime),
    });
  }

  getMtsIncome(form: MtsIncomeFormGroup): IMtsIncome | NewMtsIncome {
    return this.convertMtsIncomeRawValueToMtsIncome(form.getRawValue() as MtsIncomeFormRawValue | NewMtsIncomeFormRawValue);
  }

  resetForm(form: MtsIncomeFormGroup, mtsIncome: MtsIncomeFormGroupInput): void {
    const mtsIncomeRawValue = this.convertMtsIncomeToMtsIncomeRawValue({ ...this.getFormDefaults(), ...mtsIncome });
    form.reset(
      {
        ...mtsIncomeRawValue,
        id: { value: mtsIncomeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MtsIncomeFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      incomeDate: currentTime,
      isActive: false,
      modifyDatetime: currentTime,
      createDatetime: currentTime,
    };
  }

  private convertMtsIncomeRawValueToMtsIncome(rawMtsIncome: MtsIncomeFormRawValue | NewMtsIncomeFormRawValue): IMtsIncome | NewMtsIncome {
    return {
      ...rawMtsIncome,
      incomeDate: dayjs(rawMtsIncome.incomeDate, DATE_TIME_FORMAT),
      modifyDatetime: dayjs(rawMtsIncome.modifyDatetime, DATE_TIME_FORMAT),
      createDatetime: dayjs(rawMtsIncome.createDatetime, DATE_TIME_FORMAT),
    };
  }

  private convertMtsIncomeToMtsIncomeRawValue(
    mtsIncome: IMtsIncome | (Partial<NewMtsIncome> & MtsIncomeFormDefaults),
  ): MtsIncomeFormRawValue | PartialWithRequiredKeyOf<NewMtsIncomeFormRawValue> {
    return {
      ...mtsIncome,
      incomeDate: mtsIncome.incomeDate ? mtsIncome.incomeDate.format(DATE_TIME_FORMAT) : undefined,
      modifyDatetime: mtsIncome.modifyDatetime ? mtsIncome.modifyDatetime.format(DATE_TIME_FORMAT) : undefined,
      createDatetime: mtsIncome.createDatetime ? mtsIncome.createDatetime.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
