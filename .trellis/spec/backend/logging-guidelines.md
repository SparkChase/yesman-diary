# Logging Guidelines

> How logging is done in this project.

---

## Overview

Minimal logging — this is a personal project. `console.error` for actual errors, `console.log` only during local development (remove before commit).

---

## Log Levels

| Level | When to Use |
|-------|-------------|
| `console.error` | API route catch blocks, database connection failures, unexpected exceptions |
| `console.warn` | Deprecated patterns, non-fatal issues (rarely needed) |
| `console.log` | **Local dev only** — must be removed before committing |
| `console.info` | Not used |

---

## Structured Logging

Not required. Simple string messages are sufficient:

```ts
// Good
console.error("Failed to create moment:", error.message);

// Overkill for this project
console.error(JSON.stringify({ level: "error", message: "...", timestamp: "..." }));
```

---

## What to Log

- Database query failures
- API route exceptions (with the route name)
- Environment variable misconfigurations at startup

---

## What NOT to Log

- **Passwords or tokens** — never log `PRIVATE_ACCESS_PASSWORD` or `TURSO_AUTH_TOKEN`
- **User input content** — don't log diary content (privacy)
- **Stack traces in production responses** — log to console only, never send to client
