import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency } from '@/lib/format';

export function TotalCard({ total, count }: { total: number; count: number }) {
  const theme = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: theme.accent }]}>
      <AppText variant="caption" style={{ color: theme.onAccent, opacity: 0.8 }}>
        Tổng chi · {count} khoản
      </AppText>
      <AppText variant="display" tabular adjustsFontSizeToFit numberOfLines={1} style={{ color: theme.onAccent }}>
        {formatCurrency(total)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.two,
    padding: Spacing.six,
    borderRadius: Radius.large,
  },
});
