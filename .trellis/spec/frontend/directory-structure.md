# Directory Structure

> How frontend code is organized in this project.

---

## Overview

This is a **Next.js 14 App Router** project using the standard Next.js file-based routing convention. All source code lives under `app/` and `components/`.

---

## Directory Layout

```
yes-man/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home (challenge card + quick log)
│   ├── timeline/page.tsx         # Public timeline
│   ├── stats/page.tsx            # Stats dashboard
│   ├── private/page.tsx          # Private space (password gate)
│   ├── share/[id]/page.tsx       # Share poster page
│   ├── api/                      # Route Handlers (see backend specs)
│   ├── layout.tsx                # Root layout (nav, fonts, providers)
│   └── globals.css               # Tailwind directives + theme colors
├── components/
│   ├── ui/                       # Primitive UI (Button, Card, Input, Badge)
│   ├── challenge/                # Challenge-related components
│   ├── moments/                  # Moment/diary components
│   ├── stats/                    # Stats/chart components
│   ├── share/                    # Poster generation components
│   └── layout/                   # Navbar, Footer, PasswordGate
├── lib/
│   ├── db.ts                     # Turso client setup
│   ├── utils.ts                  # Date formatters, category mapping
│   └── constants.ts              # Color maps, category definitions
├── data/
│   └── challenges.json           # Pre-built challenge library
├── public/
│   └── images/                   # Static assets
├── .env.local                    # Local env vars (gitignored)
├── .env.example                  # Env template (committed)
├── next.config.js
├── tailwind.config.ts            # Extended theme colors
└── tsconfig.json
```

---

## Module Organization

- **Page components** are co-located with their route in `app/`
- **Reusable components** are grouped by feature under `components/<feature>/`
- **UI primitives** (Button, Input, Card) live in `components/ui/` — these are unstyled or minimally styled, meant for composition
- **Cross-cutting utilities** (db client, helpers) live in `lib/`
- **Static data** (challenge JSON) lives in `data/`

---

## Naming Conventions

- **Files**: PascalCase for components (`ChallengeCard.tsx`), camelCase for utilities (`utils.ts`)
- **Folders**: lowercase-kebab for feature groups (`challenge/`, `moment-form/`)
- **Page files**: always `page.tsx` inside their route folder
- **API routes**: always `route.ts` inside their route folder
- **Custom hooks**: prefix with `use` (`useMoments.ts`)

---

## Examples

- A new stats chart: `components/stats/MonthlyChart.tsx`
- A new share poster style: `components/share/PosterWide.tsx`
- A new API endpoint: `app/api/achievements/route.ts`
