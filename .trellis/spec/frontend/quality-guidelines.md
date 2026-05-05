# Quality Guidelines

> Code quality standards for frontend development.

---

## Overview

This is a personal project — quality bar is "clean and maintainable", not "enterprise-grade". Lint and typecheck must pass before committing.

---

## Forbidden Patterns

| Pattern | Why |
|---------|-----|
| `any` type | Use `unknown` + type guard, or define the interface |
| `console.log` in production code | Remove before commit; use `console.error` for actual errors only |
| `useEffect` for initial data fetch | Use Server Components instead |
| Inline styles (`style={{}}`) | Use Tailwind classes |
| `@ts-ignore` | Fix the type issue or use `@ts-expect-error` with a reason |

---

## Required Patterns

- **TypeScript strict mode** — enabled in `tsconfig.json`
- **Tailwind for all styling** — no CSS Modules, no styled-components
- **Server Components by default** — only add `"use client"` when needed
- **Semantic HTML** — `<button>` for clicks, `<a>` for navigation, proper heading hierarchy

---

## Testing Requirements

No automated tests required for this personal project. Manual testing checklist before commit:

- [ ] Page loads without hydration errors
- [ ] Forms submit successfully
- [ ] API routes return expected data
- [ ] Mobile responsive (test at 375px width)
- [ ] Poster generation produces correct image

---

## Code Review Checklist

For AI-generated code, verify:

1. **No `any` types** — all props and API responses are typed
2. **No unused imports** — clean up auto-generated imports
3. **Client/server boundary correct** — `"use client"` only where needed
4. **Tailwind classes valid** — no arbitrary values that should be theme tokens
5. **Accessibility basics** — buttons are keyboard accessible, images have alt text
