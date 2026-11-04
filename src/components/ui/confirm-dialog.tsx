import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type ConfirmDialogProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Hủy',
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const theme = useTheme();
  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onCancel} statusBarTranslucent>
      <Animated.View entering={FadeIn.duration(180)} style={[styles.backdrop, { backgroundColor: theme.overlay }]}>
        <Pressable accessibilityLabel={cancelLabel} style={StyleSheet.absoluteFill} onPress={onCancel} />
        <Animated.View
          entering={ZoomIn.duration(220)}
          accessibilityViewIsModal
          style={[styles.dialog, { backgroundColor: theme.surface }]}>
          <View style={styles.text}>
            <AppText variant="heading">{title}</AppText>
            <AppText color="textMuted">{message}</AppText>
          </View>
          <View style={styles.actions}>
            <View style={styles.action}>
              <Button label={cancelLabel} variant="secondary" onPress={onCancel} disabled={loading} />
            </View>
            <View style={styles.action}>
              <Button label={confirmLabel} variant="danger" onPress={onConfirm} loading={loading} />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.six },
  dialog: {
    width: '100%',
    maxWidth: 420,
    gap: Spacing.six,
    padding: Spacing.six,
    borderRadius: Radius.large,
  },
  text: { gap: Spacing.two },
  actions: { flexDirection: 'row', gap: Spacing.three },
  action: { flex: 1 },
});
