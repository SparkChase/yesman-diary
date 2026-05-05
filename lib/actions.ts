import { getDb } from "@/lib/db";
import { Moment } from "@/lib/constants";

export async function getPublicMoments(month?: string): Promise<Moment[]> {
  const db = getDb();
  let query = "SELECT * FROM moments WHERE is_public = 1";
  const args: (string | number)[] = [];

  if (month) {
    query += " AND completed_at LIKE ?";
    args.push(`${month}%`);
  }

  query += " ORDER BY completed_at DESC";

  const result = await db.execute({ sql: query, args });

  return result.rows.map((row) => ({
    id: row.id as number,
    content: row.content as string,
    category: row.category as Moment["category"],
    source: row.source as Moment["source"],
    is_public: Boolean(row.is_public),
    completed_at: row.completed_at as string,
    created_at: row.created_at as string,
  }));
}

export async function getMomentById(id: number): Promise<Moment | null> {
  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM moments WHERE id = ? AND is_public = 1",
    args: [id],
  });

  if (result.rows.length === 0) return null;

  const row = result.rows[0];
  return {
    id: row.id as number,
    content: row.content as string,
    category: row.category as Moment["category"],
    source: row.source as Moment["source"],
    is_public: Boolean(row.is_public),
    completed_at: row.completed_at as string,
    created_at: row.created_at as string,
  };
}

export async function getPrivateMoments(password: string): Promise<Moment[]> {
  const correctPassword = process.env.PRIVATE_ACCESS_PASSWORD;
  if (!correctPassword || password !== correctPassword) {
    throw new Error("Unauthorized");
  }

  const db = getDb();
  const result = await db.execute({
    sql: "SELECT * FROM moments WHERE is_public = 0 ORDER BY completed_at DESC",
    args: [],
  });

  return result.rows.map((row) => ({
    id: row.id as number,
    content: row.content as string,
    category: row.category as Moment["category"],
    source: row.source as Moment["source"],
    is_public: Boolean(row.is_public),
    completed_at: row.completed_at as string,
    created_at: row.created_at as string,
  }));
}

export async function createMoment(data: {
  content: string;
  category: string;
  source: string;
  is_public: number;
  completed_at: string;
}): Promise<Moment> {
  const db = getDb();
  const result = await db.execute({
    sql: `INSERT INTO moments (content, category, source, is_public, completed_at)
          VALUES (?, ?, ?, ?, ?)
          RETURNING *`,
    args: [data.content, data.category, data.source, data.is_public, data.completed_at],
  });

  const row = result.rows[0];
  return {
    id: row.id as number,
    content: row.content as string,
    category: row.category as Moment["category"],
    source: row.source as Moment["source"],
    is_public: Boolean(row.is_public),
    completed_at: row.completed_at as string,
    created_at: row.created_at as string,
  };
}
