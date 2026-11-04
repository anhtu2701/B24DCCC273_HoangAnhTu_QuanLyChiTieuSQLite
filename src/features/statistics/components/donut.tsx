import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { CATEGORY_META } from '@/constants/categories';
import type { CategoryStat } from '@/features/statistics/use-category-totals';
import { useTheme } from '@/hooks/use-theme';

const SIZE = 200;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function Donut({ stats }: { stats: CategoryStat[] }) {
  const theme = useTheme();
  const segments = stats
    .filter((stat) => stat.percent > 0)
    .map((stat, index, visible) => ({
      stat,
      length: (stat.percent / 100) * CIRCUMFERENCE,
      offset: visible.slice(0, index).reduce((sum, prev) => sum + (prev.percent / 100) * CIRCUMFERENCE, 0),
    }));

  return (
    <View accessibilityRole="image" accessibilityLabel="Biểu đồ tỉ lệ chi tiêu theo danh mục">
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke={theme.surfaceMuted}
          strokeWidth={STROKE}
          fill="none"
        />
        {segments.map(({ stat, length, offset }) => (
          <Circle
            key={stat.category}
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke={CATEGORY_META[stat.category].color}
            strokeWidth={STROKE}
            strokeDasharray={`${Math.max(length - 2, 0)} ${CIRCUMFERENCE}`}
            strokeDashoffset={-offset}
            fill="none"
            rotation={-90}
            origin={`${SIZE / 2}, ${SIZE / 2}`}
          />
        ))}
      </Svg>
    </View>
  );
}
