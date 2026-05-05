import { createClient } from "@libsql/client";

export function getDb() {
  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (dbUrl && authToken) {
    return createClient({
      url: dbUrl,
      authToken,
    });
  }

  // Fallback: local file-based SQLite for development (no env vars needed)
  return createClient({
    url: "file:./local.db",
  });
}

export async function initDb() {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS moments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      category TEXT DEFAULT 'custom',
      source TEXT DEFAULT 'custom',
      is_public BOOLEAN DEFAULT 1,
      completed_at TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    )
  `);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_moments_completed ON moments(completed_at)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_moments_public ON moments(is_public)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_moments_category ON moments(category)`);
}
