import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import { CategoryChips } from '@/features/expenses/components/category-chips';
import { DateField } from '@/features/expenses/components/date-field';
import { formatCurrency } from '@/lib/format';
import { validateExpenseForm, type ExpenseFormErrors, type ExpenseFormValues } from '@/lib/validators';
import type { Category } from '@/types/expense';

type ExpenseFormProps = {
  initialValues: ExpenseFormValues;
  submitLabel: string;
  onSubmit: (values: ExpenseFormValues) => Promise<void>;
};

export function ExpenseForm({ initialValues, submitLabel, onSubmit }: ExpenseFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ExpenseFormErrors>({});
  const [saving, setSaving] = useState(false);

  const update = <K extends keyof ExpenseFormValues>(key: K, value: ExpenseFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async () => {
    const found = validateExpenseForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  const amount = Number(values.amount);

  return (
    <View style={styles.root}>
      <TextField
        label="Tên khoản chi"
        value={values.name}
        onChangeText={(text) => update('name', text)}
        error={errors.name}
        returnKeyType="next"
      />
      <View style={styles.amount}>
        <TextField
          label="Số tiền (₫)"
          value={values.amount}
          onChangeText={(text) => update('amount', text.replace(/\D/g, ''))}
          error={errors.amount}
          keyboardType="number-pad"
        />
        {amount > 0 ? (
          <AppText variant="caption" color="textMuted" tabular>
            {formatCurrency(amount)}
          </AppText>
        ) : null}
      </View>
      <View style={styles.group}>
        <AppText variant="caption" color="textMuted">
          Danh mục
        </AppText>
        <CategoryChips
          includeAll={false}
          value={values.category as Category}
          onChange={(category) => update('category', category)}
        />
      </View>
      <DateField label="Ngày chi tiêu" value={values.date} onChange={(date) => update('date', date)} error={errors.date} />
      <TextField
        label="Ghi chú (không bắt buộc)"
        value={values.note}
        onChangeText={(text) => update('note', text)}
        multiline
      />
      <Button label={submitLabel} onPress={submit} loading={saving} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: Spacing.five },
  amount: { gap: Spacing.two },
  group: { gap: Spacing.two },
});
