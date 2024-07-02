import dayjs from 'dayjs/esm';

export interface IMtsIncome {
  id: number;
  incomeDate?: dayjs.Dayjs | null;
  incomeAmount?: number | null;
  incomeType?: string | null;
  incomeTypeDetail?: string | null;
  incomePayer?: string | null;
  incomeReceiver?: string | null;
  incomeRemark?: string | null;
  isActive?: boolean | null;
  modifier?: string | null;
  modifyDatetime?: dayjs.Dayjs | null;
  creator?: string | null;
  createDatetime?: dayjs.Dayjs | null;
}

export type NewMtsIncome = Omit<IMtsIncome, 'id'> & { id: null };
