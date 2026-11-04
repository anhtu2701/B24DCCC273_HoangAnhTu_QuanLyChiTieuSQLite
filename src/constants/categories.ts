import { BookOpen, Bus, Ellipsis, Gamepad2, Utensils } from 'lucide-react-native';
import type { ComponentType } from 'react';

import type { Category } from '@/types/expense';

type IconComponent = ComponentType<{ size?: number; color?: string; strokeWidth?: number }>;

export const CATEGORY_META: Record<Category, { color: string; Icon: IconComponent }> = {
  'Ăn uống': { color: '#E2733B', Icon: Utensils },
  'Đi lại': { color: '#3A7FC2', Icon: Bus },
  'Học tập': { color: '#C9981F', Icon: BookOpen },
  'Giải trí': { color: '#CC4F7C', Icon: Gamepad2 },
  Khác: { color: '#6F7F77', Icon: Ellipsis },
};
