import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { Pencil, Trash2 } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Radius, Spacing } from '@/constants/theme';
import { deleteExpense, getExpenseById } from '@/db/repositories/expenses.repository';
import { CategoryBadge } from '@/features/expenses/components/category-badge';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency, formatDate } from '@/lib/format';
import type { Expense } from '@/types/expense';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <AppText color="textMuted">{label}</AppText>
      <AppText variant="bodyStrong" style={styles.detailValue}>
        {value}
      </AppText>
    </View>
  );
}

export default function ExpenseDetailScreen() {
  const theme = useTheme();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id: string }>();
  const expenseId = Number(id);
  const [expense, setExpense] = useState<Expense | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getExpenseById(db, expenseId).then((found) => {
        if (!active) return;
        if (found) setExpense(found);
        else router.back();
      });
      return () => {
        active = false;
      };
    }, [db, expenseId]),
  );

  const remove = async () => {
    setDeleting(true);
    await deleteExpense(db, expenseId);
    setConfirming(false);
    router.back();
  };

  return (
    <Screen>
      <ScreenHeader title="Chi tiết khoản chi" />
      {expense ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Animated.View entering={FadeInDown.duration(420)} style={styles.hero}>
            <CategoryBadge category={expense.category} size={64} />
            <AppText variant="heading" style={styles.center}>
              {expense.name}
            </AppText>
            <AppText variant="display" tabular adjustsFontSizeToFit numberOfLines={1}>
              {formatCurrency(expense.amount)}
            </AppText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(100).duration(420)} style={[styles.card, { backgroundColor: theme.surface }]}>
            <DetailRow label="Danh mục" value={expense.category} />
            <DetailRow label="Ngày chi tiêu" value={formatDate(expense.date)} />
            <DetailRow label="Ghi chú" value={expense.note || 'Không có ghi chú'} />
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(200).duration(420)} style={styles.actions}>
            <Button
              label="Sửa khoản chi"
              icon={<MorphIcon icon={Pencil} tone="onAccent" size={20} />}
              onPress={() => router.push({ pathname: '/expense/form', params: { id: String(expense.id) } })}
            />
            <Button
              label="Xóa khoản chi"
              variant="secondary"
              icon={<MorphIcon icon={Trash2} tone="danger" size={20} />}
              onPress={() => setConfirming(true)}
            />
          </Animated.View>
        </ScrollView>
      ) : null}

      <ConfirmDialog
        visible={confirming}
        title="Xóa khoản chi?"
        message="Khoản chi này sẽ bị xóa vĩnh viễn và không thể khôi phục."
        confirmLabel="Xóa"
        loading={deleting}
        onConfirm={remove}
        onCancel={() => setConfirming(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.six, paddingBottom: Spacing.eight },
  hero: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.four },
  center: { textAlign: 'center' },
  card: { borderRadius: Radius.large, padding: Spacing.five, gap: Spacing.five },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.four },
  detailValue: { flex: 1, textAlign: 'right' },
  actions: { gap: Spacing.three },
});
