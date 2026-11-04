export const Colors = {
  light: {
    background: '#F2F4F0',
    surface: '#FFFFFF',
    surfaceMuted: '#E7EBE5',
    border: '#B8C2BA',
    text: '#111612',
    textMuted: '#5B645D',
    accent: '#1F7A4D',
    onAccent: '#FFFFFF',
    danger: '#C0392B',
    onDanger: '#FFFFFF',
    overlay: 'rgba(17,22,18,0.45)',
  },
  dark: {
    background: '#0D110E',
    surface: '#161C18',
    surfaceMuted: '#212924',
    border: '#3F4C43',
    text: '#F1F4F0',
    textMuted: '#9AA59D',
    accent: '#4CC38A',
    onAccent: '#06130B',
    danger: '#F0705F',
    onDanger: '#1A0704',
    overlay: 'rgba(0,0,0,0.6)',
  },
} as const;

export type ThemeColors = { [K in keyof typeof Colors.light]: string };
export type ThemeColor = keyof ThemeColors;

export const Fonts = {
  regular: 'BeVietnamPro_400Regular',
  medium: 'BeVietnamPro_500Medium',
  semibold: 'BeVietnamPro_600SemiBold',
  bold: 'BeVietnamPro_700Bold',
} as const;

export const Spacing = {
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
  seven: 32,
  eight: 48,
} as const;

export const Radius = {
  small: 10,
  medium: 16,
  large: 24,
  pill: 999,
} as const;

export const Typography = {
  display: { fontFamily: Fonts.bold, fontSize: 40, lineHeight: 44, letterSpacing: -1.2 },
  title: { fontFamily: Fonts.bold, fontSize: 28, lineHeight: 34, letterSpacing: -0.6 },
  heading: { fontFamily: Fonts.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  body: { fontFamily: Fonts.regular, fontSize: 16, lineHeight: 24 },
  bodyStrong: { fontFamily: Fonts.semibold, fontSize: 16, lineHeight: 24 },
  caption: { fontFamily: Fonts.medium, fontSize: 14, lineHeight: 20 },
} as const;

export type TypographyVariant = keyof typeof Typography;

export const MaxContentWidth = 640;
