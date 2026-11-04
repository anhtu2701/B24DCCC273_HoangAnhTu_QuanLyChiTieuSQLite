import { useState } from 'react';
import { View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Plus, X } from '@/components/ui/icons';
import { MorphIcon } from '@/components/ui/morph-icon';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/screen';

export default function Index() {
  const [open, setOpen] = useState(false);
  return (
    <Screen>
      <AppText variant="display">Budget Control</AppText>
      <View style={{ marginTop: 24, alignItems: 'flex-start' }}>
        <PressableScale onPress={() => setOpen((v) => !v)} accessibilityRole="button" accessibilityLabel="Toggle">
          <MorphIcon icon={open ? X : Plus} size={32} />
        </PressableScale>
      </View>
    </Screen>
  );
}
