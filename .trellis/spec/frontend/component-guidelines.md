# Component Guidelines

> How components are built in this project.

---

## Overview

We use **React Server Components (RSC)** by default in the App Router. Client interactivity (state, effects, event handlers) is added only when needed via `"use client"`.

---

## Component Structure

```tsx
// Server Component (default)
export default function MomentItem({ moment }: { moment: Moment }) {
  return (
    <div className="rounded-lg border p-4">
      <p>{moment.content}</p>
    </div>
  );
}

// Client Component (only when interactivity needed)
"use client";

import { useState } from "react";

export default function MomentForm() {
  const [content, setContent] = useState("");
  // ...
}
```

---

## Props Conventions

- Use **inline TypeScript interfaces** for props, avoid separate `.types.ts` files for small components
- Destructure props in the function signature
- Keep props flat — avoid deep nested objects when possible

```tsx
// Good
interface ChallengeCardProps {
  content: string;
  category: Category;
  onAccept: () => void;
}

export default function ChallengeCard({ content, category, onAccept }: ChallengeCardProps) {
  // ...
}
```

---

## Styling Patterns

- **Tailwind CSS** for all styling — no CSS Modules, no styled-components
- Use `cn()` utility (from `lib/utils.ts`, wraps `clsx` + `tailwind-merge`) for conditional classes
- Theme colors are defined in `tailwind.config.ts` (e.g., `yes-yellow`, `yes-orange`)

```tsx
// Good
<div className={cn("rounded-lg border p-4", isActive && "bg-yes-yellow")}>

// Avoid
<div style={{ backgroundColor: "#FFD700" }}>
```

---

## Accessibility

- All interactive elements must be keyboard accessible
- Use semantic HTML (`<button>` not `<div onClick>`)
- Add `aria-label` to icon-only buttons
- Color contrast must pass WCAG AA (our yellow/orange palette is checked)

---

## Common Mistakes

- **Adding `"use client"` unnecessarily** — default to Server Components, only add client directive for state/effects/events
- **Using `useEffect` for data fetching** — use Server Components or API calls directly; avoid `useEffect` + `fetch` patterns
- **Deep prop drilling** — use composition or colocate state in parent client components
- **Writing CSS in JS** — always use Tailwind utility classes
