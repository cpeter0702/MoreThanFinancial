import dayjs from 'dayjs/esm';

import { IMtsIncome, NewMtsIncome } from './mts-income.model';

export const sampleWithRequiredData: IMtsIncome = {
  id: 11228,
  incomeDate: dayjs('2024-07-01T15:29'),
  incomeAmount: 31137.95,
};

export const sampleWithPartialData: IMtsIncome = {
  id: 12071,
  incomeDate: dayjs('2024-07-01T06:30'),
  incomeAmount: 24509.6,
  incomeType: 'abstract evoke',
  incomeTypeDetail: 'ack sharply',
  incomePayer: 'even drat tango',
  incomeRemark: 'waltz oh',
  modifier: 'husky',
  creator: 'fickle zowie',
};

export const sampleWithFullData: IMtsIncome = {
  id: 1863,
  incomeDate: dayjs('2024-07-01T05:16'),
  incomeAmount: 22839.53,
  incomeType: 'ecliptic',
  incomeTypeDetail: 'traditionalism acidly',
  incomePayer: 'denude even',
  incomeReceiver: 'afore',
  incomeRemark: 'ironclad',
  isActive: true,
  modifier: 'wearily',
  modifyDatetime: dayjs('2024-07-01T22:05'),
  creator: 'yowza except',
  createDatetime: dayjs('2024-07-01T13:34'),
};

export const sampleWithNewData: NewMtsIncome = {
  incomeDate: dayjs('2024-07-01T18:52'),
  incomeAmount: 12603.67,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
