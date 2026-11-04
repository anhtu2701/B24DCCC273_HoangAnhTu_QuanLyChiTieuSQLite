import { useState, type ReactNode, type Ref } from 'react';
import { StyleSheet, TextInput, View, type TextInputInstance, type TextInputProps } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Fonts, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type TextFieldProps = TextInputProps & {
  ref?: Ref<TextInputInstance>;
  label: string;
  error?: string | null;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function TextField({ ref, label, error, leading, trailing, multiline, style, onFocus, onBlur, ...rest }: TextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error ? theme.danger : focused ? theme.accent : theme.border;
  return (
    <View style={styles.wrapper}>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
      <View
        style={[
          styles.field,
          { backgroundColor: theme.surface, borderColor },
          multiline && styles.multiline,
        ]}>
        {leading}
        <TextInput
          ref={ref}
          accessibilityLabel={label}
          placeholderTextColor={theme.textMuted}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
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
