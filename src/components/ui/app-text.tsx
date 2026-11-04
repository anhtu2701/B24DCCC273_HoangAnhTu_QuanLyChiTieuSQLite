import { Text, type TextProps } from 'react-native';

import { Typography, type ThemeColor, type TypographyVariant } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type AppTextProps = TextProps & {
  variant?: TypographyVariant;
  color?: ThemeColor;
  tabular?: boolean;
};

export function AppText({ variant = 'body', color = 'text', tabular, style, ...rest }: AppTextProps) {
  const theme = useTheme();
  return (
    <Text
      style={[
        Typography[variant],
        { color: theme[color] },
        tabular && { fontVariant: ['tabular-nums'] },
        style,
      ]}
      {...rest}
    />
  );
}
