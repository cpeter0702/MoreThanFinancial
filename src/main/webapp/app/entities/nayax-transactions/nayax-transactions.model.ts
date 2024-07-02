import dayjs from 'dayjs/esm';

export interface INayaxTransactions {
  id: number;
  siteID?: number | null;
  transactionID?: string | null;
  paymentMethodID?: number | null;
  currency?: string | null;
  machineName?: string | null;
  authorizationValue?: number | null;
  campaignID?: string | null;
  settlementValue?: number | null;
  productSelectionInfo?: string | null;
  cardNumber?: string | null;
  authrizationRRN?: string | null;
  machineAuthorizationTime?: dayjs.Dayjs | null;
  machineSettlementTime?: dayjs.Dayjs | null;
  creditCardType?: string | null;
  cardType?: string | null;
  paymentMethod?: string | null;
  transactionStatusID?: number | null;
  transactionTypeID?: number | null;
  billingProvider?: string | null;
  prepaidCardHolderName?: string | null;
  refundRequestBy?: string | null;
  refundRequestDate?: dayjs.Dayjs | null;
  refundReason?: string | null;
}

export type NewNayaxTransactions = Omit<INayaxTransactions, 'id'> & { id: null };
