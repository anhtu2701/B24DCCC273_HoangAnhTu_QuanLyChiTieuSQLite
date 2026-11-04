import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Radius, Spacing } from '@/constants/theme';
import { CategoryBadge } from '@/features/expenses/components/category-badge';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Expense } from '@/types/expense';

export function ExpenseRow({ expense }: { expense: Expense }) {
  const theme = useTheme();
  return (
    <View style={[styles.row, { backgroundColor: theme.surface }]}>
      <CategoryBadge category={expense.category} />
      <View style={styles.main}>
        <AppText variant="bodyStrong" numberOfLines={1}>
          {expense.name}
        </AppText>
        <AppText variant="caption" color="textMuted" numberOfLines={1}>
          {expense.category} · {formatDate(expense.date)}
        </AppText>
      </View>
      <AppText variant="bodyStrong" tabular>
        {formatCurrency(expense.amount)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
  },
  main: { flex: 1, gap: 2 },
});
