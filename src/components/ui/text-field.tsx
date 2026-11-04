import type { ComponentRef, ReactNode, Ref } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextFieldProps = TextInputProps & {
  ref?: Ref<ComponentRef<typeof TextInput>>;
  label: string;
  error?: string | null;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function TextField({ ref, label, error, leading, trailing, multiline, style, ...rest }: TextFieldProps) {
  const theme = useTheme();
  return (
    <View style={styles.wrapper}>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          { backgroundColor: theme.surface, borderColor: error ? theme.danger : 'transparent' },
          multiline && styles.multiline,
        ]}>
        {leading}
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          placeholderTextColor={theme.textMuted}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          style={[styles.input, { color: theme.text }, multiline && styles.inputMultiline, style]}
          {...rest}
        />
        {trailing}
      </View>
      {error ? (
        <AppText variant="caption" color="danger" accessibilityRole="alert">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.two },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 54,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  multiline: { alignItems: 'flex-start', paddingVertical: Spacing.three },
  input: { flex: 1, fontFamily: Fonts.medium, fontSize: 16, paddingVertical: Spacing.three },
  inputMultiline: { minHeight: 96, paddingVertical: 0 },
});
