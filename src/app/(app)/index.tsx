import { AppText } from '@/components/ui/app-text';
import { Button } from '@/components/ui/button';
import { Screen } from '@/components/ui/screen';
import { useAuth } from '@/features/auth/auth-context';

export default function Index() {
  const { signOut } = useAuth();
  return (
    <Screen>
      <AppText variant="display">Budget Control</AppText>
      <Button label="Đăng xuất" variant="secondary" onPress={signOut} />
    </Screen>
  );
}
