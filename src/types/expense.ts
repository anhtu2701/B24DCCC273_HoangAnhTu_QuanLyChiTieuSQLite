export const CATEGORIES = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí', 'Khác'] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryFilter = Category | 'all';

export type Expense = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  date: string;
  note: string | null;
};

export type ExpenseInput = Omit<Expense, 'id'>;

export type ExpenseFilter = {
  keyword: string;
  category: CategoryFilter;
};

export type CategoryTotal = {
  category: Category;
  total: number;
};
