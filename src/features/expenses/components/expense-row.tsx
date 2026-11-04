import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Radius, Spacing } from '@/constants/theme';
import { CategoryBadge } from '@/features/expenses/components/category-badge';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Expense } from '@/types/expense';

export function ExpenseRow({ expense }: { expense: Expense }) {
  const theme = useTheme();
  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={`${expense.name}, ${formatCurrency(expense.amount)}`}
      scaleTo={0.98}
      onPress={() => router.push({ pathname: '/expense/[id]', params: { id: String(expense.id) } })}
      style={[styles.row, { backgroundColor: theme.surface }]}>
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
    </PressableScale>
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
