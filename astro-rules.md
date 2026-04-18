# Astro Project Rules for AI Agents

## Tech Stack
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **CMS**: Sanity
- **Animations**: Framer Motion
- **Email**: Resend
- **Database** (if needed): Supabase
- **Deployment**: Vercel or Netlify

---

## Icons Rule
- **Use Phosphor Icons** as the primary icon library
- If a specific icon is not available in Phosphor, use a **custom SVG icon**
- **Lucide Icons are strictly banned** — never install or use lucide-react or any lucide package
- No other icon library should be used unless explicitly approved

---

## Folder Structure

The project must follow this exact folder structure. No shortcuts, no dumping files at root level.

```
root/
├── public/
│   └── assets/
│       ├── images/        — static images that don't need optimization (og images, favicons)
│       ├── icons/         — static SVG icons not managed by Phosphor
│       ├── fonts/         — self hosted font files
│       └── videos/        — video files if any
│
├── src/
│   ├── assets/
│   │   ├── images/        — images processed and optimized by Astro
│   │   └── svgs/          — inline SVGs used in components
│   │
│   ├── components/
│   │   ├── ui/            — small reusable UI elements (buttons, badges, cards)
│   │   ├── sections/      — page sections (hero, features, testimonials, pricing)
│   │   ├── layout/        — header, footer, navbar, sidebar
│   │   └── common/        — shared components used across multiple pages (SEO, analytics)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro       — root HTML shell, meta tags, fonts
│   │   └── PageLayout.astro       — wraps header + footer around page content
│   │
│   ├── pages/             — each .astro file here = a route automatically
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   │
│   ├── content/           — markdown / MDX content collections
│   │   └── blog/
│   │
│   ├── lib/               — utility functions, API clients, helpers
│   │   ├── sanity.ts      — sanity client setup
│   │   ├── resend.ts      — resend email setup
│   │   └── utils.ts       — general helper functions
│   │
│   ├── styles/
│   │   └── global.css     — global styles, Tailwind base imports, CSS variables
│   │
│   └── types/             — TypeScript type definitions
│       └── index.ts
│
├── sanity/                — Sanity studio and schema files
│   ├── schemas/
│   └── sanity.config.ts
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── .env
```

---

## Folder Rules

- **Never** place image or SVG files directly in `src/` or `public/` root — always go inside the correct subfolder
- **Never** place components directly in `src/components/` root — always go inside `ui/`, `sections/`, `layout/`, or `common/`
- `public/assets/` is for files served as-is with no processing
- `src/assets/` is for files that Astro will process and optimize
- All Sanity related files live inside the `sanity/` folder at root, never mixed into `src/`
- All third party client setup files (Sanity client, Resend, Supabase) live in `src/lib/`
- Environment variables always go in `.env` — never hardcode API keys anywhere

---

## Code Rules

- Always use **TypeScript** — no plain `.js` files
- Use **Tailwind CSS** for all styling — no inline styles, no separate CSS files per component except `global.css`
- All components must have proper TypeScript props defined with interfaces or types
- Use **Astro components** (`.astro`) for static/layout parts
- Use **React components** (`.tsx`) only when client side interactivity is needed (forms, modals, toggles) — mark these with `client:load` or `client:visible`
- Keep pages thin — pages should only import and compose sections, no logic inside page files

---

## Naming Conventions

- Components: `PascalCase` — `HeroSection.astro`, `ContactForm.tsx`
- Utility files: `camelCase` — `sanity.ts`, `utils.ts`
- Pages: `kebab-case` — `about.astro`, `our-team.astro`
- Image files: `kebab-case` — `hero-banner.jpg`, `team-photo.webp`
- CSS variables: `kebab-case` — `--color-primary`, `--font-heading`

---

## Performance Rules

- Always use Astro's built in `<Image />` component for images — never use plain `<img>` tags for local images
- Lazy load images that are below the fold using `loading="lazy"`
- Use `client:visible` instead of `client:load` for components that are not in the viewport on load
- Never import heavy libraries globally — import only where needed
