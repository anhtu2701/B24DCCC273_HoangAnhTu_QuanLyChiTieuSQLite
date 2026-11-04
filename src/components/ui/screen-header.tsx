import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { ArrowLeft } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ScreenHeaderProps = {
  title: string;
  trailing?: ReactNode;
};

export function ScreenHeader({ title, trailing }: ScreenHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.root}>
      <PressableScale
        accessibilityRole="button"
        accessibilityLabel="Quay lại"
        onPress={() => router.back()}
        style={[styles.button, { backgroundColor: theme.surface }]}>
        <MorphIcon icon={ArrowLeft} />
      </PressableScale>
      <AppText variant="heading" style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <View style={styles.trailing}>{trailing}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.four,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1 },
  trailing: { minWidth: 44, alignItems: 'flex-end' },
});
