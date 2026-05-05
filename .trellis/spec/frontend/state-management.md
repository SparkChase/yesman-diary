# State Management

> How state is managed in this project.

---

## Overview

This project is intentionally **light on global state**. Most state is local to components or derived from server data.

---

## State Categories

| Category | Tool | When to Use |
|----------|------|-------------|
| **Local UI state** | `useState` / `useReducer` | Form inputs, toggles, modals |
| **Server state** | Next.js Server Components + API Routes | Moments list, stats, timeline data |
| **Global shared state** | React Context (lightweight) | Theme, auth gate status, password session |
| **URL state** | Next.js `useSearchParams` | Filters, month selection |

---

## When to Use Global State

Avoid global state unless:
1. Multiple distant components need the same data (e.g., navbar badge + stats page)
2. Data needs to persist across navigation (e.g., private access session)

**Current global contexts** (planned):
- `PrivateAccessContext` — stores whether user has unlocked private space in this session

---

## Server State

- Fetch data in **Server Components** where possible (`async function Page()`)
- For client-side mutations (POST/DELETE), call API Routes directly from event handlers
- Do NOT use `useEffect` + `fetch` for initial data loading — let Server Components handle it
- After mutations, use `router.refresh()` or `revalidatePath()` to update Server Component data

```tsx
// Good: Server Component fetches data
export default async function TimelinePage() {
  const moments = await getPublicMoments(); // calls Turso via API or direct lib
  return <Timeline moments={moments} />;
}

// Good: Client Component calls API on action
"use client";
async function handleSubmit() {
  await fetch("/api/moments", { method: "POST", body: JSON.stringify(data) });
  router.refresh();
}
```

---

## Common Mistakes

- **Using useEffect for initial data fetch** — causes waterfall, flashing loading states. Use Server Components.
- **Over-engineering with Redux/Zustand** — this project doesn't need them. React Context + Server Components are enough.
- **Mixing server and client data patterns** — decide per page: Server Component for read, Client Component for write.
