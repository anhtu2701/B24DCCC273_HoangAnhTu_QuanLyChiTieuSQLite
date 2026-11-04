import { Redirect } from 'expo-router';

import { useAuth } from '@/features/auth/auth-context';

export default function Index() {
  const { userId } = useAuth();
  return <Redirect href={userId === null ? '/login' : '/home'} />;
}
