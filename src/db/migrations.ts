import * as Crypto from 'expo-crypto';
import type { SQLiteDatabase } from 'expo-sqlite';

import {
  CREATE_EXPENSES_TABLE,
  CREATE_USERS_TABLE,
  INSERT_EXPENSE,
  INSERT_USER,
  SCHEMA_VERSION,
} from '@/db/schema';

export function hashPassword(password: string) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
}

export async function migrate(db: SQLiteDatabase) {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const version = row?.user_version ?? 0;
  if (version >= SCHEMA_VERSION) return;

  if (version < 1) {
    const adminPassword = await hashPassword('123456');
    await db.withTransactionAsync(async () => {
      await db.execAsync(CREATE_USERS_TABLE);
      await db.execAsync(CREATE_EXPENSES_TABLE);
      await db.runAsync(INSERT_USER, 'admin', adminPassword);
      await db.runAsync(INSERT_EXPENSE, 'Ăn sáng', 30000, 'Ăn uống', '2026-10-13', null);
      await db.runAsync(INSERT_EXPENSE, 'Đổ xăng', 50000, 'Đi lại', '2026-10-12', null);
      await db.runAsync(INSERT_EXPENSE, 'Mua sách', 120000, 'Học tập', '2026-10-11', null);
    });
  }

  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}
