import type { SQLiteDatabase } from 'expo-sqlite';

import { INSERT_EXPENSE } from '@/db/schema';
import {
  CATEGORIES,
  type CategoryTotal,
  type Expense,
  type ExpenseFilter,
  type ExpenseInput,
} from '@/types/expense';

const FILTER_CLAUSE = `name LIKE ? ESCAPE '\\' AND (? = 'all' OR category = ?)`;

function filterParams({ keyword, category }: ExpenseFilter) {
  const escaped = keyword.trim().replace(/[\\%_]/g, (char) => `\\${char}`);
  return [`%${escaped}%`, category, category] as const;
}

export async function insertExpense(db: SQLiteDatabase, input: ExpenseInput) {
  const result = await db.runAsync(
    INSERT_EXPENSE,
    input.name,
    input.amount,
    input.category,
    input.date,
    input.note,
  );
  return result.lastInsertRowId;
}

export async function updateExpense(db: SQLiteDatabase, id: number, input: ExpenseInput) {
  const result = await db.runAsync(
    'UPDATE expenses SET name = ?, amount = ?, category = ?, date = ?, note = ? WHERE id = ?',
    input.name,
    input.amount,
    input.category,
    input.date,
    input.note,
    id,
  );
  return result.changes > 0;
}

export async function deleteExpense(db: SQLiteDatabase, id: number) {
  const result = await db.runAsync('DELETE FROM expenses WHERE id = ?', id);
  return result.changes > 0;
}

export function getExpenseById(db: SQLiteDatabase, id: number) {
  return db.getFirstAsync<Expense>('SELECT * FROM expenses WHERE id = ?', id);
}

export function getExpenses(db: SQLiteDatabase, filter: ExpenseFilter) {
  return db.getAllAsync<Expense>(
    `SELECT * FROM expenses WHERE ${FILTER_CLAUSE} ORDER BY date DESC, id DESC`,
    ...filterParams(filter),
  );
}

export async function getTotal(db: SQLiteDatabase, filter: ExpenseFilter) {
  const row = await db.getFirstAsync<{ total: number | null; count: number }>(
    `SELECT SUM(amount) AS total, COUNT(*) AS count FROM expenses WHERE ${FILTER_CLAUSE}`,
    ...filterParams(filter),
  );
  return { total: row?.total ?? 0, count: row?.count ?? 0 };
}

export async function getTotalByCategory(db: SQLiteDatabase): Promise<CategoryTotal[]> {
  const rows = await db.getAllAsync<{ category: string; total: number }>(
    'SELECT category, SUM(amount) AS total FROM expenses GROUP BY category',
  );
  const totals = new Map(rows.map((row) => [row.category, row.total]));
  return CATEGORIES.map((category) => ({ category, total: totals.get(category) ?? 0 }));
}
