import { StyleSheet, View } from 'react-native';

import { CATEGORY_META } from '@/constants/categories';
import type { Category } from '@/types/expense';

export function CategoryBadge({ category, size = 44 }: { category: Category; size?: number }) {
  const { color, Icon } = CATEGORY_META[category];
  return (
    <View style={[styles.badge, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Icon size={size * 0.46} color="#FFFFFF" strokeWidth={2.2} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignItems: 'center', justifyContent: 'center' },
});
