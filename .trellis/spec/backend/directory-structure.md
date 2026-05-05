# Directory Structure

> How backend code is organized in this project.

---

## Overview

Backend logic lives inside **Next.js App Router API Routes** (`app/api/*/route.ts`). There is no separate backend server — everything runs as Vercel Serverless Functions.

---

## Directory Layout

```
app/api/
├── moments/
│   └── route.ts              # GET /api/moments, POST /api/moments
├── moments/
│   └── private/
│       └── route.ts          # GET /api/moments/private (password protected)
├── stats/
│   └── route.ts              # GET /api/stats
└── challenges/
    └── random/
        └── route.ts          # GET /api/challenges/random
```

---

## Module Organization

- **Route Handlers** are the only backend entry points
- **Database queries** are colocated in `lib/db.ts` (Turso client setup + query helpers)
- **Business logic** should be thin in Route Handlers — delegate to utility functions in `lib/`
- **No separate controllers/services layers** — this is a small personal project, keep it simple

---

## Naming Conventions

- **API route files**: always named `route.ts`
- **HTTP methods**: export named functions `GET`, `POST`, `PUT`, `DELETE`
- **Query helpers**: camelCase in `lib/db.ts`
- **Environment variables**: `UPPER_SNAKE_CASE` in `.env.local`

---

## Examples

```ts
// app/api/moments/route.ts
import { createMoment, getPublicMoments } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month");
  const moments = await getPublicMoments(month);
  return Response.json(moments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const moment = await createMoment(body);
  return Response.json(moment, { status: 201 });
}
```
