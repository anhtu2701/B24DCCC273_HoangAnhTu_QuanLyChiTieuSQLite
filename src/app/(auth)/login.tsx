import { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, type TextInputInstance } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';
import { TextField } from '@/components/ui/text-field';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/features/auth/auth-context';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInputInstance>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reveal, setReveal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!username.trim() || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }
    setLoading(true);
    setError(null);
    const ok = await signIn(username, password);
    if (!ok) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      setLoading(false);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Animated.View entering={FadeInDown.duration(500)} style={styles.header}>
            <AppText variant="display">Quản lý{'\n'}chi tiêu</AppText>
            <AppText color="textMuted">Đăng nhập để xem các khoản chi của bạn.</AppText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(90).duration(500)} style={styles.form}>
            <TextField
              label="Tên đăng nhập"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError(null);
              }}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <TextField
              ref={passwordRef}
              label="Mật khẩu"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null);
              }}
              secureTextEntry={!reveal}
              autoCapitalize="none"
              returnKeyType="go"
              onSubmitEditing={submit}
              trailing={
                <PressableScale
                  accessibilityRole="button"
                  accessibilityLabel={reveal ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  hitSlop={12}
                  onPress={() => setReveal((value) => !value)}>
                  <MorphIcon icon={reveal ? EyeOff : Eye} tone="textMuted" />
                </PressableScale>
              }
            />
            {error ? (
              <AppText variant="caption" color="danger" accessibilityRole="alert">
                {error}
              </AppText>
            ) : null}
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(180).duration(500)} style={styles.actions}>
            <Button label="Đăng nhập" onPress={submit} loading={loading} />
            <AppText variant="caption" color="textMuted">
              Tài khoản mẫu: admin / 123456
            </AppText>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { flexGrow: 1, justifyContent: 'center', gap: Spacing.seven, paddingVertical: Spacing.seven },
  header: { gap: Spacing.three },
  form: { gap: Spacing.four },
  actions: { gap: Spacing.three, alignItems: 'center' },
});
