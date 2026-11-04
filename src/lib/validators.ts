import { toISODate } from '@/lib/format';

export type ExpenseFormValues = {
  name: string;
  amount: string;
  category: string;
  date: string;
  note: string;
};

export type ExpenseFormErrors = Partial<Record<'name' | 'amount' | 'date', string>>;

export function validateExpenseForm(values: ExpenseFormValues): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};

  if (!values.name.trim()) errors.name = 'Vui lòng nhập tên khoản chi';

  const amount = Number(values.amount);
  if (!values.amount || !Number.isInteger(amount) || amount <= 0) {
    errors.amount = 'Số tiền phải là số nguyên lớn hơn 0';
  }

  if (!values.date) {
    errors.date = 'Vui lòng chọn ngày chi tiêu';
  } else if (values.date > toISODate(new Date())) {
    errors.date = 'Không được chọn ngày sau ngày hiện tại';
  }

  return errors;
}
