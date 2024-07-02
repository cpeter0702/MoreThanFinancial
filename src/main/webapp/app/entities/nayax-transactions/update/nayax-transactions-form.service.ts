import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { INayaxTransactions, NewNayaxTransactions } from '../nayax-transactions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INayaxTransactions for edit and NewNayaxTransactionsFormGroupInput for create.
 */
type NayaxTransactionsFormGroupInput = INayaxTransactions | PartialWithRequiredKeyOf<NewNayaxTransactions>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends INayaxTransactions | NewNayaxTransactions> = Omit<
  T,
  'machineAuthorizationTime' | 'machineSettlementTime' | 'refundRequestDate'
> & {
  machineAuthorizationTime?: string | null;
  machineSettlementTime?: string | null;
  refundRequestDate?: string | null;
};

type NayaxTransactionsFormRawValue = FormValueOf<INayaxTransactions>;

type NewNayaxTransactionsFormRawValue = FormValueOf<NewNayaxTransactions>;

type NayaxTransactionsFormDefaults = Pick<
  NewNayaxTransactions,
  'id' | 'machineAuthorizationTime' | 'machineSettlementTime' | 'refundRequestDate'
>;

type NayaxTransactionsFormGroupContent = {
  id: FormControl<NayaxTransactionsFormRawValue['id'] | NewNayaxTransactions['id']>;
  siteID: FormControl<NayaxTransactionsFormRawValue['siteID']>;
  transactionID: FormControl<NayaxTransactionsFormRawValue['transactionID']>;
  paymentMethodID: FormControl<NayaxTransactionsFormRawValue['paymentMethodID']>;
  currency: FormControl<NayaxTransactionsFormRawValue['currency']>;
  machineName: FormControl<NayaxTransactionsFormRawValue['machineName']>;
  authorizationValue: FormControl<NayaxTransactionsFormRawValue['authorizationValue']>;
  campaignID: FormControl<NayaxTransactionsFormRawValue['campaignID']>;
  settlementValue: FormControl<NayaxTransactionsFormRawValue['settlementValue']>;
  productSelectionInfo: FormControl<NayaxTransactionsFormRawValue['productSelectionInfo']>;
  cardNumber: FormControl<NayaxTransactionsFormRawValue['cardNumber']>;
  authrizationRRN: FormControl<NayaxTransactionsFormRawValue['authrizationRRN']>;
  machineAuthorizationTime: FormControl<NayaxTransactionsFormRawValue['machineAuthorizationTime']>;
  machineSettlementTime: FormControl<NayaxTransactionsFormRawValue['machineSettlementTime']>;
  creditCardType: FormControl<NayaxTransactionsFormRawValue['creditCardType']>;
  cardType: FormControl<NayaxTransactionsFormRawValue['cardType']>;
  paymentMethod: FormControl<NayaxTransactionsFormRawValue['paymentMethod']>;
  transactionStatusID: FormControl<NayaxTransactionsFormRawValue['transactionStatusID']>;
  transactionTypeID: FormControl<NayaxTransactionsFormRawValue['transactionTypeID']>;
  billingProvider: FormControl<NayaxTransactionsFormRawValue['billingProvider']>;
  prepaidCardHolderName: FormControl<NayaxTransactionsFormRawValue['prepaidCardHolderName']>;
  refundRequestBy: FormControl<NayaxTransactionsFormRawValue['refundRequestBy']>;
  refundRequestDate: FormControl<NayaxTransactionsFormRawValue['refundRequestDate']>;
  refundReason: FormControl<NayaxTransactionsFormRawValue['refundReason']>;
};

export type NayaxTransactionsFormGroup = FormGroup<NayaxTransactionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NayaxTransactionsFormService {
  createNayaxTransactionsFormGroup(nayaxTransactions: NayaxTransactionsFormGroupInput = { id: null }): NayaxTransactionsFormGroup {
    const nayaxTransactionsRawValue = this.convertNayaxTransactionsToNayaxTransactionsRawValue({
      ...this.getFormDefaults(),
      ...nayaxTransactions,
    });
    return new FormGroup<NayaxTransactionsFormGroupContent>({
      id: new FormControl(
        { value: nayaxTransactionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      siteID: new FormControl(nayaxTransactionsRawValue.siteID),
      transactionID: new FormControl(nayaxTransactionsRawValue.transactionID, {
        validators: [Validators.required],
      }),
      paymentMethodID: new FormControl(nayaxTransactionsRawValue.paymentMethodID),
      currency: new FormControl(nayaxTransactionsRawValue.currency, {
        validators: [Validators.required],
      }),
      machineName: new FormControl(nayaxTransactionsRawValue.machineName, {
        validators: [Validators.required],
      }),
      authorizationValue: new FormControl(nayaxTransactionsRawValue.authorizationValue),
      campaignID: new FormControl(nayaxTransactionsRawValue.campaignID),
      settlementValue: new FormControl(nayaxTransactionsRawValue.settlementValue),
      productSelectionInfo: new FormControl(nayaxTransactionsRawValue.productSelectionInfo, {
        validators: [Validators.required],
      }),
      cardNumber: new FormControl(nayaxTransactionsRawValue.cardNumber, {
        validators: [Validators.required],
      }),
      authrizationRRN: new FormControl(nayaxTransactionsRawValue.authrizationRRN, {
        validators: [Validators.required],
      }),
      machineAuthorizationTime: new FormControl(nayaxTransactionsRawValue.machineAuthorizationTime),
      machineSettlementTime: new FormControl(nayaxTransactionsRawValue.machineSettlementTime),
      creditCardType: new FormControl(nayaxTransactionsRawValue.creditCardType),
      cardType: new FormControl(nayaxTransactionsRawValue.cardType),
      paymentMethod: new FormControl(nayaxTransactionsRawValue.paymentMethod),
      transactionStatusID: new FormControl(nayaxTransactionsRawValue.transactionStatusID),
      transactionTypeID: new FormControl(nayaxTransactionsRawValue.transactionTypeID),
      billingProvider: new FormControl(nayaxTransactionsRawValue.billingProvider),
      prepaidCardHolderName: new FormControl(nayaxTransactionsRawValue.prepaidCardHolderName),
      refundRequestBy: new FormControl(nayaxTransactionsRawValue.refundRequestBy),
      refundRequestDate: new FormControl(nayaxTransactionsRawValue.refundRequestDate),
      refundReason: new FormControl(nayaxTransactionsRawValue.refundReason),
    });
  }

  getNayaxTransactions(form: NayaxTransactionsFormGroup): INayaxTransactions | NewNayaxTransactions {
    return this.convertNayaxTransactionsRawValueToNayaxTransactions(
      form.getRawValue() as NayaxTransactionsFormRawValue | NewNayaxTransactionsFormRawValue,
    );
  }

  resetForm(form: NayaxTransactionsFormGroup, nayaxTransactions: NayaxTransactionsFormGroupInput): void {
    const nayaxTransactionsRawValue = this.convertNayaxTransactionsToNayaxTransactionsRawValue({
      ...this.getFormDefaults(),
      ...nayaxTransactions,
    });
    form.reset(
      {
        ...nayaxTransactionsRawValue,
        id: { value: nayaxTransactionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NayaxTransactionsFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      machineAuthorizationTime: currentTime,
      machineSettlementTime: currentTime,
      refundRequestDate: currentTime,
    };
  }

  private convertNayaxTransactionsRawValueToNayaxTransactions(
    rawNayaxTransactions: NayaxTransactionsFormRawValue | NewNayaxTransactionsFormRawValue,
  ): INayaxTransactions | NewNayaxTransactions {
    return {
      ...rawNayaxTransactions,
      machineAuthorizationTime: dayjs(rawNayaxTransactions.machineAuthorizationTime, DATE_TIME_FORMAT),
      machineSettlementTime: dayjs(rawNayaxTransactions.machineSettlementTime, DATE_TIME_FORMAT),
      refundRequestDate: dayjs(rawNayaxTransactions.refundRequestDate, DATE_TIME_FORMAT),
    };
  }

  private convertNayaxTransactionsToNayaxTransactionsRawValue(
    nayaxTransactions: INayaxTransactions | (Partial<NewNayaxTransactions> & NayaxTransactionsFormDefaults),
  ): NayaxTransactionsFormRawValue | PartialWithRequiredKeyOf<NewNayaxTransactionsFormRawValue> {
    return {
      ...nayaxTransactions,
      machineAuthorizationTime: nayaxTransactions.machineAuthorizationTime
        ? nayaxTransactions.machineAuthorizationTime.format(DATE_TIME_FORMAT)
        : undefined,
      machineSettlementTime: nayaxTransactions.machineSettlementTime
        ? nayaxTransactions.machineSettlementTime.format(DATE_TIME_FORMAT)
        : undefined,
      refundRequestDate: nayaxTransactions.refundRequestDate ? nayaxTransactions.refundRequestDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
