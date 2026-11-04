import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Spacing } from '@/constants/theme';

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <Animated.View entering={FadeIn.duration(300)} style={styles.root}>
      {icon}
      <AppText variant="heading">{title}</AppText>
      {description ? (
        <AppText color="textMuted" style={styles.text}>
          {description}
        </AppText>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.eight },
  text: { textAlign: 'center' },
});
