import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Spacing } from '@/constants/theme';

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <View style={styles.root}>
      {icon}
      <AppText variant="heading">{title}</AppText>
      {description ? (
        <AppText color="textMuted" style={styles.text}>
          {description}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.eight },
  text: { textAlign: 'center' },
});
