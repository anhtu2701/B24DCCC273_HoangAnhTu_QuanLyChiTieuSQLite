import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { Search, X } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  const theme = useTheme();
  const hasValue = value.length > 0;
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.root, { backgroundColor: theme.surface, borderColor: focused ? theme.accent : theme.border }]}>
      <TextInput
        accessibilityLabel="Tìm kiếm khoản chi"
        value={value}
        onChangeText={onChangeText}
        placeholder="Tìm theo tên khoản chi"
        placeholderTextColor={theme.textMuted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        returnKeyType="search"
        autoCorrect={false}
        style={[styles.input, { color: theme.text }]}
      />
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel={hasValue ? 'Xóa từ khóa' : 'Tìm kiếm'}
        disabled={!hasValue}
        hitSlop={12}
        onPress={() => onChangeText('')}>
        <MorphIcon icon={hasValue ? X : Search} tone="textMuted" size={20} />
      </PressableScale>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 52,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  input: { flex: 1, fontFamily: Fonts.medium, fontSize: 16, paddingVertical: Spacing.three },
});
