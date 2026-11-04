import { MorphIcon as BaseMorphIcon, type IconInput, type MorphIconProps } from 'morphicons/react-native';

import type { ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type AppMorphIconProps = Omit<MorphIconProps, 'icon' | 'color'> & {
  icon: IconInput;
  tone?: ThemeColor;
};

export function MorphIcon({ icon, tone = 'text', size = 22, strokeWidth = 2, spring = 'snappy', ...rest }: AppMorphIconProps) {
  const theme = useTheme();
  return (
    <BaseMorphIcon
      icon={icon}
      color={theme[tone]}
      size={size}
      strokeWidth={strokeWidth}
      spring={spring}
      reducedMotion="user"
      {...rest}
    />
  );
}
