import dayjs from 'dayjs/esm';

import { INayaxTransactions, NewNayaxTransactions } from './nayax-transactions.model';

export const sampleWithRequiredData: INayaxTransactions = {
  id: 12576,
  transactionID: 'gee blessing',
  currency: 'while whenever',
  machineName: 'yuck',
  productSelectionInfo: 'nor off',
  cardNumber: 'before self-assured standard',
  authrizationRRN: 'yippee carefree bleakly',
};

export const sampleWithPartialData: INayaxTransactions = {
  id: 29565,
  siteID: 5413,
  transactionID: 'however',
  paymentMethodID: 10440,
  currency: 'inasmuch rubber frightfully',
  machineName: 'upwardly fill',
  authorizationValue: 2212,
  campaignID: 'yet',
  settlementValue: 130.36,
  productSelectionInfo: 'offensive granular after',
  cardNumber: 'till hmph statue',
  authrizationRRN: 'cenotaph',
  machineSettlementTime: dayjs('2024-07-02T00:21'),
  creditCardType: 'this geez zealous',
  cardType: 'offensively shocked yawningly',
  transactionStatusID: 23739,
  prepaidCardHolderName: 'once fell',
  refundRequestBy: 'between charming',
  refundRequestDate: dayjs('2024-07-01T23:44'),
};

export const sampleWithFullData: INayaxTransactions = {
  id: 26261,
  siteID: 5304,
  transactionID: 'immaterial fooey programme',
  paymentMethodID: 18751,
  currency: 'revolving bah whether',
  machineName: 'inasmuch range whenever',
  authorizationValue: 19837,
  campaignID: 'recommend',
  settlementValue: 30518.56,
  productSelectionInfo: 'unionise',
  cardNumber: 'before knuckle artistic',
  authrizationRRN: 'ew',
  machineAuthorizationTime: dayjs('2024-07-01T14:10'),
  machineSettlementTime: dayjs('2024-07-01T19:06'),
  creditCardType: 'zowie woot',
  cardType: 'bah mediocre',
  paymentMethod: 'ack amused',
  transactionStatusID: 12831,
  transactionTypeID: 10086,
  billingProvider: 'urn cheerfully',
  prepaidCardHolderName: 'meanwhile once',
  refundRequestBy: 'diligently gravitas',
  refundRequestDate: dayjs('2024-07-01T05:33'),
  refundReason: 'opposite yum after',
};

export const sampleWithNewData: NewNayaxTransactions = {
  transactionID: 'abbey how revenge',
  currency: 'obediently',
  machineName: 'inasmuch clearly cultivated',
  productSelectionInfo: 'aha',
  cardNumber: 'amid',
  authrizationRRN: 'medical inquisitively whoa',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
