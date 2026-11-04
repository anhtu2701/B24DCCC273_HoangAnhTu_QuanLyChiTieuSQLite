import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';
import { formatDate, fromISODate, toISODate } from '@/lib/format';

type DateFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
};

export function DateField({ label, value, onChange, error }: DateFieldProps) {
  const theme = useTheme();
  const scheme = useColorScheme();
  const current = fromISODate(value);

  const openAndroid = () => {
    DateTimePickerAndroid.open({
      value: current,
      mode: 'date',
      maximumDate: new Date(),
      onValueChange: (_event, date) => onChange(toISODate(date)),
    });
  };

  return (
    <View style={styles.wrapper}>
      <AppText variant="caption" color="textMuted">
        {label}
      </AppText>
      <View style={[styles.field, { backgroundColor: theme.surface, borderColor: error ? theme.danger : theme.border }]}>
        {Platform.OS === 'ios' ? (
          <DateTimePicker
            value={current}
            mode="date"
            display="compact"
            maximumDate={new Date()}
            accentColor={theme.accent}
            themeVariant={scheme === 'dark' ? 'dark' : 'light'}
            onValueChange={(_event, date) => onChange(toISODate(date))}
          />
        ) : (
          <PressableScale
            accessibilityRole="button"
            accessibilityLabel={`${label}: ${formatDate(value)}`}
            onPress={openAndroid}
            style={styles.press}>
            <AppText variant="bodyStrong">{formatDate(value)}</AppText>
          </PressableScale>
        )}
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
    minHeight: 54,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  press: { flex: 1, justifyContent: 'center', alignSelf: 'stretch' },
});
