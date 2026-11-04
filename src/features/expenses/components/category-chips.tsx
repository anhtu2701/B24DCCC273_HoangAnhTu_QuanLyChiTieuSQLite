import { ScrollView, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { CATEGORIES, type Category, type CategoryFilter } from '@/types/expense';

type CategoryChipsProps = {
  value: CategoryFilter;
  onChange: (value: CategoryFilter) => void;
  includeAll?: boolean;
};

const OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  ...CATEGORIES.map((category: Category) => ({ value: category, label: category })),
];

export function CategoryChips({ value, onChange, includeAll = true }: CategoryChipsProps) {
  const theme = useTheme();
  const options = includeAll ? OPTIONS : OPTIONS.slice(1);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <PressableScale
            key={option.value}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.chip, { backgroundColor: selected ? theme.text : theme.surface, borderColor: selected ? theme.text : theme.border }]}>
            <AppText variant="caption" style={{ color: selected ? theme.background : theme.text }}>
              {option.label}
            </AppText>
          </PressableScale>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { gap: Spacing.two },
  chip: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Radius.pill,
    borderWidth: 1.5,
  },
});
