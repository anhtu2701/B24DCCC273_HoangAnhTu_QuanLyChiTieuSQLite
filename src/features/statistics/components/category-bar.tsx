import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Radius, Spacing } from '@/constants/theme';
import { CATEGORY_META } from '@/constants/categories';
import { CategoryBadge } from '@/features/expenses/components/category-badge';
import type { CategoryStat } from '@/features/statistics/use-category-totals';
import { useTheme } from '@/hooks/use-theme';
import { formatCurrency } from '@/lib/format';

export function CategoryBar({ stat, index }: { stat: CategoryStat; index: number }) {
  const theme = useTheme();
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(withDelay(index * 70, withTiming(stat.percent, { duration: 700, easing: Easing.out(Easing.cubic) })));
  }, [progress, stat.percent, index]);

  const fill = useAnimatedStyle(() => ({ width: `${progress.value}%` }));

  return (
    <View style={[styles.row, { backgroundColor: theme.surface }]}>
      <CategoryBadge category={stat.category} size={40} />
      <View style={styles.main}>
        <View style={styles.top}>
          <AppText variant="bodyStrong" numberOfLines={1} style={styles.name}>
            {stat.category}
          </AppText>
          <AppText variant="bodyStrong" tabular>
            {formatCurrency(stat.total)}
          </AppText>
        </View>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(stat.percent) }}
          style={[styles.track, { backgroundColor: theme.surfaceMuted }]}>
          <Animated.View style={[styles.fill, { backgroundColor: CATEGORY_META[stat.category].color }, fill]} />
        </View>
        <AppText variant="caption" color="textMuted" tabular>
          {Math.round(stat.percent)}%
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
  },
  main: { flex: 1, gap: Spacing.two },
  top: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.three },
  name: { flex: 1 },
  track: { height: 8, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: Radius.pill },
});
