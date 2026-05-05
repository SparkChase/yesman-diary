import { getDb } from "@/lib/db";
import { Category } from "@/lib/constants";

export interface Stats {
  total: number;
  thisMonth: number;
  streak: number;
  monthly: { month: string; count: number }[];
  byCategory: { category: Category; count: number }[];
}

export async function getStats(): Promise<Stats> {
  const db = getDb();

  // Total count
  const totalResult = await db.execute({
    sql: "SELECT COUNT(*) as count FROM moments WHERE is_public = 1",
    args: [],
  });
  const total = Number(totalResult.rows[0]?.count ?? 0);

  // This month count
  const now = new Date();
  const thisMonthPrefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const thisMonthResult = await db.execute({
    sql: "SELECT COUNT(*) as count FROM moments WHERE is_public = 1 AND completed_at LIKE ?",
    args: [`${thisMonthPrefix}%`],
  });
  const thisMonth = Number(thisMonthResult.rows[0]?.count ?? 0);

  // Monthly breakdown (last 12 months)
  const monthlyResult = await db.execute({
    sql: `SELECT strftime('%Y-%m', completed_at) as month, COUNT(*) as count
          FROM moments
          WHERE is_public = 1 AND completed_at >= date('now', '-11 months', 'start of month')
          GROUP BY month
          ORDER BY month ASC`,
    args: [],
  });

  // Build a complete 12-month array with zeros for missing months
  const monthlyMap = new Map<string, number>();
  monthlyResult.rows.forEach((row) => {
    monthlyMap.set(row.month as string, Number(row.count));
  });

  const monthly: { month: string; count: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    monthly.push({ month: monthKey, count: monthlyMap.get(monthKey) ?? 0 });
  }

  // Category breakdown
  const categoryResult = await db.execute({
    sql: `SELECT category, COUNT(*) as count
          FROM moments
          WHERE is_public = 1
          GROUP BY category
          ORDER BY count DESC`,
    args: [],
  });

  const byCategory = categoryResult.rows.map((row) => ({
    category: row.category as Category,
    count: Number(row.count),
  }));

  // Streak: consecutive days with records
  const streakResult = await db.execute({
    sql: `SELECT DISTINCT date(completed_at) as day
          FROM moments
          WHERE is_public = 1 AND completed_at IS NOT NULL
          ORDER BY day DESC`,
    args: [],
  });

  let streak = 0;
  if (streakResult.rows.length > 0) {
    const days = streakResult.rows.map((row) => row.day as string);
    streak = 1;
    for (let i = 1; i < days.length; i++) {
      const prev = new Date(days[i - 1]);
      const curr = new Date(days[i]);
      const diffDays = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    // Check if today or yesterday is included, otherwise streak is 0
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (days[0] !== today && days[0] !== yesterday) {
      streak = 0;
    }
  }

  return { total, thisMonth, streak, monthly, byCategory };
}
