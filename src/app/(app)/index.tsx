import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { EmptyState } from '@/components/ui/empty-state';
import { LogOut } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { Radius, Spacing } from '@/constants/theme';
import { useAuth } from '@/features/auth/auth-context';
import { CategoryChips } from '@/features/expenses/components/category-chips';
import { ExpenseRow } from '@/features/expenses/components/expense-row';
import { SearchBar } from '@/features/expenses/components/search-bar';
import { TotalCard } from '@/features/expenses/components/total-card';
import { useExpenses } from '@/features/expenses/use-expenses';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { useTheme } from '@/hooks/use-theme';
import type { CategoryFilter } from '@/types/expense';

export default function ExpenseListScreen() {
  const theme = useTheme();
  const { signOut } = useAuth();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const debouncedKeyword = useDebouncedValue(keyword);
  const { expenses, total, count, loaded } = useExpenses({ keyword: debouncedKeyword, category });

  return (
    <Screen>
      <View style={styles.titleRow}>
        <AppText variant="title">Chi tiêu</AppText>
        <PressableScale
          accessibilityRole="button"
          accessibilityLabel="Đăng xuất"
          onPress={signOut}
          style={[styles.iconButton, { backgroundColor: theme.surface }]}>
          <MorphIcon icon={LogOut} />
        </PressableScale>
      </View>
      <View style={styles.filters}>
        <SearchBar value={keyword} onChangeText={setKeyword} />
        <CategoryChips value={category} onChange={setCategory} />
      </View>
      <FlatList
        data={expenses}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <TotalCard total={total} count={count} />
          </View>
        }
        ListEmptyComponent={loaded ? <EmptyState title="Chưa có khoản chi nào" /> : undefined}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInDown.delay(Math.min(index, 8) * 50).duration(380)}>
            <ExpenseRow expense={item} />
          </Animated.View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: Spacing.eight },
  header: { marginBottom: Spacing.five },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  filters: { gap: Spacing.three, paddingBottom: Spacing.four },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: { height: Spacing.two },
});
