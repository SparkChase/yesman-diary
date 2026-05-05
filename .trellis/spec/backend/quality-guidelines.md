# Quality Guidelines

> Code quality standards for backend development.

---

## Overview

Backend in this project means **Next.js API Route Handlers**. Keep them thin — validation, then delegate to `lib/db.ts`.

---

## Forbidden Patterns

| Pattern | Why |
|---------|-----|
| String-concatenated SQL | SQL injection risk — always use parameterized queries |
| Exposing env vars to client | `TURSO_AUTH_TOKEN` and `PRIVATE_ACCESS_PASSWORD` must never leave the server |
| Returning stack traces to client | Security leak — return generic 500 messages |
| `any` in API payloads | Use Zod validation + inferred types |

---

## Required Patterns

- **Parameterized SQL** — `@libsql/client` supports `sql` + `args`
- **Zod validation** — validate all POST/PUT body input before touching the database
- **Try-catch in every route handler** — never let an unhandled exception crash the function
- **Consistent error response** — always return `{ error: "message" }` on failures

---

## Testing Requirements

No automated tests. Manual verification checklist:

- [ ] API route responds with correct status codes
- [ ] Invalid input returns 400 with clear message
- [ ] Wrong password returns 401 for private routes
- [ ] Database queries execute without syntax errors
- [ ] Environment variables are loaded correctly

---

## Code Review Checklist

1. **SQL is parameterized** — no template literals with variables
2. **Env vars are server-only** — no `process.env` in client components
3. **Error handling covers all paths** — every async operation is wrapped
4. **No secrets in responses** — passwords, tokens never in JSON responses
5. **Status codes are correct** — 200, 201, 400, 401, 404, 500 used appropriately
