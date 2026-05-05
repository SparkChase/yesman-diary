# Hook Guidelines

> How hooks are used in this project.

---

## Overview

Hooks are used sparingly. Default to **Server Components** for data, **Client Components** only for interactivity.

---

## Custom Hook Patterns

Create a custom hook only when logic is reused across 2+ components.

```ts
// Good: reused form logic
export function useMomentForm() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("custom");
  const [isPublic, setIsPublic] = useState(true);

  const reset = () => {
    setContent("");
    setCategory("custom");
    setIsPublic(true);
  };

  return { content, setContent, category, setCategory, isPublic, setIsPublic, reset };
}
```

---

## Data Fetching

- **Server Components**: fetch directly in the component (`async function Page()`)
- **Client mutations**: call API Routes in event handlers, then `router.refresh()`
- **No React Query / SWR** — this project is small enough that Server Components + manual refresh is sufficient

```tsx
// Good: Server Component
export default async function TimelinePage() {
  const moments = await getPublicMoments();
  return <Timeline moments={moments} />;
}

// Good: Client mutation
async function handleSubmit() {
  await fetch("/api/moments", { method: "POST", body: JSON.stringify(data) });
  router.refresh(); // refreshes Server Component data
}
```

---

## Naming Conventions

- Custom hooks: `use<Feature>` (`useMomentForm`, `usePrivateAccess`)
- Keep hooks focused — one responsibility per hook
- Export from `lib/hooks/` or colocate with the feature if only used once

---

## Common Mistakes

- **Creating hooks for single-use logic** — if only one component uses it, keep it inline
- **Fetching data in useEffect** — causes waterfalls and loading flashes. Use Server Components.
- **Not cleaning up effects** — event listeners, timers must be cleaned up in `useEffect` return
