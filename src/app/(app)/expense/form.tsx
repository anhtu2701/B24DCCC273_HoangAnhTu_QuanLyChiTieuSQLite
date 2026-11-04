import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';

import { ScreenHeader } from '@/components/ui/screen-header';
import { Screen } from '@/components/ui/screen';
import { Spacing } from '@/constants/theme';
import { getExpenseById, insertExpense, updateExpense } from '@/db/repositories/expenses.repository';
import { ExpenseForm } from '@/features/expenses/components/expense-form';
import { toISODate } from '@/lib/format';
import type { ExpenseFormValues } from '@/lib/validators';
import type { Category } from '@/types/expense';

const emptyValues = (): ExpenseFormValues => ({
  name: '',
  amount: '',
  category: 'Ăn uống',
  date: toISODate(new Date()),
  note: '',
});

export default function ExpenseFormScreen() {
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const expenseId = id ? Number(id) : null;
  const editing = expenseId !== null;
  const [initialValues, setInitialValues] = useState<ExpenseFormValues | null>(editing ? null : emptyValues());

  useEffect(() => {
    if (expenseId === null) return;
    let active = true;
    getExpenseById(db, expenseId).then((expense) => {
      if (!active) return;
      if (!expense) {
        router.back();
        return;
      }
      setInitialValues({
        name: expense.name,
        amount: String(expense.amount),
        category: expense.category,
        date: expense.date,
        note: expense.note ?? '',
      });
    });
    return () => {
      active = false;
    };
  }, [db, expenseId]);

  const save = async (values: ExpenseFormValues) => {
    const input = {
      name: values.name.trim(),
      amount: Number(values.amount),
      category: values.category as Category,
      date: values.date,
      note: values.note.trim() || null,
    };
    if (expenseId === null) await insertExpense(db, input);
    else await updateExpense(db, expenseId, input);
    router.back();
  };

  return (
    <Screen>
      <ScreenHeader title={editing ? 'Sửa khoản chi' : 'Thêm khoản chi'} />
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {initialValues ? (
            <ExpenseForm
              initialValues={initialValues}
              submitLabel={editing ? 'Cập nhật khoản chi' : 'Lưu khoản chi'}
              onSubmit={save}
            />
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingBottom: Spacing.eight },
});
