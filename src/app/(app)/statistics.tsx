import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Screen } from '@/components/ui/screen';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Spacing } from '@/constants/theme';
import { CategoryBar } from '@/features/statistics/components/category-bar';
import { Donut } from '@/features/statistics/components/donut';
import { useCategoryTotals } from '@/features/statistics/use-category-totals';
import { formatCurrency } from '@/lib/format';

export default function StatisticsScreen() {
  const { stats, total, loaded } = useCategoryTotals();

  return (
    <Screen>
      <ScreenHeader title="Thống kê" />
      {loaded ? (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Animated.View entering={FadeInDown.duration(420)} style={styles.summary}>
            <View style={styles.donut}>
              <Donut stats={stats} />
            </View>
            <View style={styles.totalBlock}>
              <AppText variant="caption" color="textMuted">
                Tổng chi tiêu
              </AppText>
              <AppText variant="display" tabular adjustsFontSizeToFit numberOfLines={1}>
                {formatCurrency(total)}
              </AppText>
            </View>
          </Animated.View>

          <View style={styles.list}>
            {stats.map((stat, index) => (
              <Animated.View key={stat.category} entering={FadeInDown.delay(120 + index * 60).duration(420)}>
                <CategoryBar stat={stat} index={index} />
              </Animated.View>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.six, paddingBottom: Spacing.eight },
  summary: { gap: Spacing.five, alignItems: 'center' },
  donut: { alignItems: 'center' },
  totalBlock: { alignItems: 'center', gap: Spacing.one },
  list: { gap: Spacing.two },
});
