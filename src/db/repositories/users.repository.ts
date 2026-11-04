import type { SQLiteDatabase } from 'expo-sqlite';

import { hashPassword } from '@/db/migrations';

export async function checkLogin(db: SQLiteDatabase, username: string, password: string) {
  const hashed = await hashPassword(password);
  const row = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM users WHERE username = ? AND password = ?',
    username,
    hashed,
  );
  return row?.id ?? null;
}

export async function userExists(db: SQLiteDatabase, id: number) {
  const row = await db.getFirstAsync<{ id: number }>('SELECT id FROM users WHERE id = ?', id);
  return row !== null;
}
