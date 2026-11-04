import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="expense/form" options={{ animation: 'slide_from_bottom' }} />
    </Stack>
  );
}
