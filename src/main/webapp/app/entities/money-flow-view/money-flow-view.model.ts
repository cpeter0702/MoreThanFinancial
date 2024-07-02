import dayjs from 'dayjs/esm';

export interface IMoneyFlowView {
  id: number;
  source?: string | null;
  businessId?: string | null;
  businessDate?: dayjs.Dayjs | null;
  businessAmt?: number | null;
  businessType?: string | null;
  businessTypeDetail?: string | null;
  payer?: string | null;
  receiver?: string | null;
  remark?: string | null;
  isActive?: boolean | null;
}

export type NewMoneyFlowView = Omit<IMoneyFlowView, 'id'> & { id: null };
