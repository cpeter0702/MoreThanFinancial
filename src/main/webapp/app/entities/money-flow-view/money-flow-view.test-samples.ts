import dayjs from 'dayjs/esm';

import { IMoneyFlowView, NewMoneyFlowView } from './money-flow-view.model';

export const sampleWithRequiredData: IMoneyFlowView = {
  id: 11032,
  source: 'transfer upwardly twig',
  businessId: '9a84e2e4-de76-4fce-aaf1-fd7741ed0c1a',
  businessDate: dayjs('2024-07-02T01:31'),
  businessAmt: 32110.87,
};

export const sampleWithPartialData: IMoneyFlowView = {
  id: 27835,
  source: 'statute',
  businessId: '57c5e928-57cc-4281-81c8-6fc48c15f95f',
  businessDate: dayjs('2024-07-02T00:33'),
  businessAmt: 19897.81,
  businessType: 'pfft',
  payer: 'unroll',
  receiver: 'where sailing',
  remark: 'whether direction for',
};

export const sampleWithFullData: IMoneyFlowView = {
  id: 31378,
  source: 'cudgel accompany laugh',
  businessId: '939f878e-38df-40c2-89bc-667f45cad58c',
  businessDate: dayjs('2024-07-01T04:54'),
  businessAmt: 23895.11,
  businessType: 'lumbering spirited given',
  businessTypeDetail: 'before although',
  payer: 'why rich',
  receiver: 'wraparound um unethically',
  remark: 'mid reconvene',
  isActive: true,
};

export const sampleWithNewData: NewMoneyFlowView = {
  source: 'messy ugh unless',
  businessId: 'de7c4c3a-cbb9-4cd8-8e57-f12b6f670f6f',
  businessDate: dayjs('2024-07-01T19:57'),
  businessAmt: 30606.67,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
