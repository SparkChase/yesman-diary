# Type Safety

> Type patterns and validation in this project.

---

## Overview

TypeScript strict mode is enabled. Types are kept simple and colocated — no separate `types/` directory.

---

## Type Organization

- **Shared types**: define in `lib/constants.ts` or `lib/db.ts` (e.g., `Moment`, `Category`)
- **Component props**: inline interface in the same file
- **API payloads**: inline in the Route Handler file

```ts
// lib/constants.ts
export type Category = "social" | "food" | "explore" | "creative" | "health" | "learning" | "custom";

export interface Moment {
  id: number;
  content: string;
  category: Category;
  source: "recommended" | "custom";
  is_public: boolean;
  completed_at: string;
  created_at: string;
}
```

---

## Validation

- **Runtime validation**: use Zod for API route input validation (lightweight, type-safe)
- **No validation library on client** — HTML5 validation (`required`, `minLength`) + TypeScript is enough for simple forms

```ts
// app/api/moments/route.ts
import { z } from "zod";

const createMomentSchema = z.object({
  content: z.string().min(1).max(500),
  category: z.enum(["social", "food", "explore", "creative", "health", "learning", "custom"]),
  is_public: z.boolean().default(true),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createMomentSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid input" }, { status: 400 });
  }
  // ...
}
```

---

## Common Patterns

- Use `satisfies` for constant objects that need type inference
- Prefer `interface` over `type` for object shapes (better error messages)
- Use `readonly` arrays for static data (`challenges.json` types)

---

## Forbidden Patterns

- **`any`** — always banned. Use `unknown` + type guard if type is truly unknown.
- **Type assertions (`as`)** — only use when you know better than the compiler, add a comment explaining why
- **Non-null assertions (`!`)** — validate existence instead (`if (!x) return`)
