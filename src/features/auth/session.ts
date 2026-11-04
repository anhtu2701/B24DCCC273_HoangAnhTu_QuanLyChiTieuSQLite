import Storage from 'expo-sqlite/kv-store';

const SESSION_KEY = 'session.userId';

export function readSession() {
  const value = Storage.getItemSync(SESSION_KEY);
  const id = value === null ? NaN : Number(value);
  return Number.isInteger(id) ? id : null;
}

export function writeSession(userId: number) {
  Storage.setItemSync(SESSION_KEY, String(userId));
}

export function clearSession() {
  Storage.removeItemSync(SESSION_KEY);
}
