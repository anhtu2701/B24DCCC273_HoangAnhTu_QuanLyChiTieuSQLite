import { useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';

import { getTotalByCategory } from '@/db/repositories/expenses.repository';
import type { CategoryTotal } from '@/types/expense';

export type CategoryStat = CategoryTotal & { percent: number };

export function useCategoryTotals() {
  const db = useSQLiteContext();
  const [state, setState] = useState<{ stats: CategoryStat[]; total: number; loaded: boolean }>({
    stats: [],
    total: 0,
    loaded: false,
  });

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getTotalByCategory(db).then((rows) => {
        if (!active) return;
        const total = rows.reduce((sum, row) => sum + row.total, 0);
        const stats = rows.map((row) => ({ ...row, percent: total > 0 ? (row.total / total) * 100 : 0 }));
        setState({ stats, total, loaded: true });
      });
      return () => {
        active = false;
      };
    }, [db]),
  );

  return state;
}
