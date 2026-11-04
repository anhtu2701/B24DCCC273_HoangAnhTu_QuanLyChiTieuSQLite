import { SQLiteProvider } from 'expo-sqlite';
import type { ReactNode } from 'react';

import { migrate } from '@/db/migrations';
import { DATABASE_NAME } from '@/db/schema';

export function DatabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrate}>
      {children}
    </SQLiteProvider>
  );
}
