import dayjs from 'dayjs/esm';

import { IMtsExpense, NewMtsExpense } from './mts-expense.model';

export const sampleWithRequiredData: IMtsExpense = {
  id: 20872,
  expenseDate: dayjs('2024-07-01T19:13'),
  expenseAmount: 7036.6,
};

export const sampleWithPartialData: IMtsExpense = {
  id: 31575,
  expenseDate: dayjs('2024-07-01T15:49'),
  expenseAmount: 15497.33,
  expenseType: 'the',
  expenseTypeDetail: 'phooey showy',
  expenseRemark: 'condescend',
  isActive: false,
  creator: 'commonly including alpenhorn',
};

export const sampleWithFullData: IMtsExpense = {
  id: 30295,
  expenseDate: dayjs('2024-07-01T13:38'),
  expenseAmount: 5538.46,
  expenseType: 'fetch dribble shelter',
  expenseTypeDetail: 'underneath yum at',
  expensePayer: 'mechanise ha',
  expenseReceiver: 'new',
  expenseRemark: 'wonderfully',
  expenseReceipt: '../fake-data/blob/hipster.png',
  expenseReceiptContentType: 'unknown',
  isActive: true,
  modifier: 'potentially',
  modifyDatetime: dayjs('2024-07-02T00:18'),
  creator: 'divert',
  createDatetime: dayjs('2024-07-02T01:36'),
};

export const sampleWithNewData: NewMtsExpense = {
  expenseDate: dayjs('2024-07-01T22:05'),
  expenseAmount: 17954.18,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
