import dayjs from 'dayjs/esm';

export interface IMtsExpense {
  id: number;
  expenseDate?: dayjs.Dayjs | null;
  expenseAmount?: number | null;
  expenseType?: string | null;
  expenseTypeDetail?: string | null;
  expensePayer?: string | null;
  expenseReceiver?: string | null;
  expenseRemark?: string | null;
  expenseReceipt?: string | null;
  expenseReceiptContentType?: string | null;
  isActive?: boolean | null;
  modifier?: string | null;
  modifyDatetime?: dayjs.Dayjs | null;
  creator?: string | null;
  createDatetime?: dayjs.Dayjs | null;
}

export type NewMtsExpense = Omit<IMtsExpense, 'id'> & { id: null };
