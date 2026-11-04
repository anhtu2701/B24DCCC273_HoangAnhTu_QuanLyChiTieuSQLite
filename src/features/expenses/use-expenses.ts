import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';

import { getExpenses, getTotal } from '@/db/repositories/expenses.repository';
import type { Expense, ExpenseFilter } from '@/types/expense';

type ExpensesState = {
  expenses: Expense[];
  total: number;
  count: number;
  loaded: boolean;
};

export function useExpenses({ keyword, category }: ExpenseFilter) {
  const db = useSQLiteContext();
  const [state, setState] = useState<ExpensesState>({ expenses: [], total: 0, count: 0, loaded: false });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      const filter = { keyword, category };
      Promise.all([getExpenses(db, filter), getTotal(db, filter)]).then(([expenses, totals]) => {
        if (active) setState({ expenses, total: totals.total, count: totals.count, loaded: true });
      });
      return () => {
        active = false;
      };
    }, [db, keyword, category]),
  );

  return state;
}
