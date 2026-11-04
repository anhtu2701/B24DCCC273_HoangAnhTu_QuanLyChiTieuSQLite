export const DATABASE_NAME = 'expense_manager.db';
export const SCHEMA_VERSION = 1;

export const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`;

export const CREATE_EXPENSES_TABLE = `
  CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    amount INTEGER NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    note TEXT
  )`;

export const INSERT_USER = 'INSERT INTO users (username, password) VALUES (?, ?)';

export const INSERT_EXPENSE =
  'INSERT INTO expenses (name, amount, category, date, note) VALUES (?, ?, ?, ?, ?)';
