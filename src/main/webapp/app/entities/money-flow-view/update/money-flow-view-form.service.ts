import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMoneyFlowView, NewMoneyFlowView } from '../money-flow-view.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMoneyFlowView for edit and NewMoneyFlowViewFormGroupInput for create.
 */
type MoneyFlowViewFormGroupInput = IMoneyFlowView | PartialWithRequiredKeyOf<NewMoneyFlowView>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMoneyFlowView | NewMoneyFlowView> = Omit<T, 'businessDate'> & {
  businessDate?: string | null;
};

type MoneyFlowViewFormRawValue = FormValueOf<IMoneyFlowView>;

type NewMoneyFlowViewFormRawValue = FormValueOf<NewMoneyFlowView>;

type MoneyFlowViewFormDefaults = Pick<NewMoneyFlowView, 'id' | 'businessDate' | 'isActive'>;

type MoneyFlowViewFormGroupContent = {
  id: FormControl<MoneyFlowViewFormRawValue['id'] | NewMoneyFlowView['id']>;
  source: FormControl<MoneyFlowViewFormRawValue['source']>;
  businessId: FormControl<MoneyFlowViewFormRawValue['businessId']>;
  businessDate: FormControl<MoneyFlowViewFormRawValue['businessDate']>;
  businessAmt: FormControl<MoneyFlowViewFormRawValue['businessAmt']>;
  businessType: FormControl<MoneyFlowViewFormRawValue['businessType']>;
  businessTypeDetail: FormControl<MoneyFlowViewFormRawValue['businessTypeDetail']>;
  payer: FormControl<MoneyFlowViewFormRawValue['payer']>;
  receiver: FormControl<MoneyFlowViewFormRawValue['receiver']>;
  remark: FormControl<MoneyFlowViewFormRawValue['remark']>;
  isActive: FormControl<MoneyFlowViewFormRawValue['isActive']>;
};

export type MoneyFlowViewFormGroup = FormGroup<MoneyFlowViewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MoneyFlowViewFormService {
  createMoneyFlowViewFormGroup(moneyFlowView: MoneyFlowViewFormGroupInput = { id: null }): MoneyFlowViewFormGroup {
    const moneyFlowViewRawValue = this.convertMoneyFlowViewToMoneyFlowViewRawValue({
      ...this.getFormDefaults(),
      ...moneyFlowView,
    });
    return new FormGroup<MoneyFlowViewFormGroupContent>({
      id: new FormControl(
        { value: moneyFlowViewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      source: new FormControl(moneyFlowViewRawValue.source, {
        validators: [Validators.required],
      }),
      businessId: new FormControl(moneyFlowViewRawValue.businessId, {
        validators: [Validators.required],
      }),
      businessDate: new FormControl(moneyFlowViewRawValue.businessDate, {
        validators: [Validators.required],
      }),
      businessAmt: new FormControl(moneyFlowViewRawValue.businessAmt, {
        validators: [Validators.required],
      }),
      businessType: new FormControl(moneyFlowViewRawValue.businessType),
      businessTypeDetail: new FormControl(moneyFlowViewRawValue.businessTypeDetail),
      payer: new FormControl(moneyFlowViewRawValue.payer),
      receiver: new FormControl(moneyFlowViewRawValue.receiver),
      remark: new FormControl(moneyFlowViewRawValue.remark),
      isActive: new FormControl(moneyFlowViewRawValue.isActive),
    });
  }

  getMoneyFlowView(form: MoneyFlowViewFormGroup): IMoneyFlowView | NewMoneyFlowView {
    return this.convertMoneyFlowViewRawValueToMoneyFlowView(form.getRawValue() as MoneyFlowViewFormRawValue | NewMoneyFlowViewFormRawValue);
  }

  resetForm(form: MoneyFlowViewFormGroup, moneyFlowView: MoneyFlowViewFormGroupInput): void {
    const moneyFlowViewRawValue = this.convertMoneyFlowViewToMoneyFlowViewRawValue({ ...this.getFormDefaults(), ...moneyFlowView });
    form.reset(
      {
        ...moneyFlowViewRawValue,
        id: { value: moneyFlowViewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): MoneyFlowViewFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      businessDate: currentTime,
      isActive: false,
    };
  }

  private convertMoneyFlowViewRawValueToMoneyFlowView(
    rawMoneyFlowView: MoneyFlowViewFormRawValue | NewMoneyFlowViewFormRawValue,
  ): IMoneyFlowView | NewMoneyFlowView {
    return {
      ...rawMoneyFlowView,
      businessDate: dayjs(rawMoneyFlowView.businessDate, DATE_TIME_FORMAT),
    };
  }

  private convertMoneyFlowViewToMoneyFlowViewRawValue(
    moneyFlowView: IMoneyFlowView | (Partial<NewMoneyFlowView> & MoneyFlowViewFormDefaults),
  ): MoneyFlowViewFormRawValue | PartialWithRequiredKeyOf<NewMoneyFlowViewFormRawValue> {
    return {
      ...moneyFlowView,
      businessDate: moneyFlowView.businessDate ? moneyFlowView.businessDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
