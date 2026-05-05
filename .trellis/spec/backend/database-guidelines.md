# Database Guidelines

> Database patterns and conventions for this project.

---

## Overview

We use **Turso** — a Serverless SQLite database — accessed via `@libsql/client`. No ORM; raw SQL with parameterized queries.

---

## Query Patterns

- Always use **parameterized queries** to prevent SQL injection
- Simple CRUD wrappers live in `lib/db.ts`
- Complex aggregations (stats) are inline in their respective API routes

```ts
// Good: parameterized query
const result = await client.execute({
  sql: "SELECT * FROM moments WHERE category = ? AND is_public = 1",
  args: [category],
});

// Avoid: string concatenation
const result = await client.execute(`SELECT * FROM moments WHERE category = '${category}'`);
```

---

## Migrations

Turso does not have a built-in migration runner for this setup. Migrations are managed manually:

1. Write migration SQL in a new file: `migrations/001_create_moments.sql`
2. Apply via Turso CLI: `turso db shell yesman < migrations/001_create_moments.sql`
3. Or apply via `lib/db.ts` init function that runs `CREATE TABLE IF NOT EXISTS`

**For this project**: Use `CREATE TABLE IF NOT EXISTS` in the app init to keep it zero-config.

---

## Naming Conventions

- **Tables**: lowercase, plural (`moments`, `challenges`)
- **Columns**: lowercase, snake_case (`completed_at`, `is_public`)
- **Indexes**: `idx_<table>_<column>` (`idx_moments_completed`)
- **Primary keys**: `id INTEGER PRIMARY KEY AUTOINCREMENT`
- **Timestamps**: ISO 8601 strings in `TEXT` columns (`completed_at`, `created_at`)

---

## Common Mistakes

- **Forgetting `IF NOT EXISTS`** — causes init failures when table already exists
- **Not creating indexes** — SQLite is fast, but unindexed queries on growing tables will slow down
- **Using numeric boolean values inconsistently** — always use `0` and `1` for booleans in SQLite
- **Storing secrets in the database** — passwords, tokens live in environment variables only
