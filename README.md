# Neat Affiliates

Landing page for the **Neat Affiliates** iGaming affiliate program, built with
Next.js 14 (App Router), TypeScript and Tailwind CSS.

## Requirements

- Node.js 18.18+ (Node 20 LTS recommended)
- npm

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Build for production                 |
| `npm run start` | Run the production build             |

## Project structure

```
app/
  layout.tsx          Root layout: fonts, metadata, contact modal
  page.tsx            Landing page (composes all sections)
  globals.css         Tailwind directives + design-system CSS
components/
  layout/             Navbar, Footer
  sections/           Hero, WhyJoin, LatestNews, Brands,
                      CommissionRates, Testimonials, Faq, FinalCta
  contact/            Contact modal + shared state + floating help button
  ui/                 Reveal (scroll animation), Logo
lib/
  data.ts             Editable content: copy, brands, commission tiers, FAQs
tailwind.config.ts    Design tokens (colors, typography, spacing)
```

## Editing content

Most text, brands, commission tables and FAQ entries live in `lib/data.ts`.
Edit that file to change content without touching the markup.

## Design system

Colors, typography scale and spacing tokens are defined in `tailwind.config.ts`
and mirror the original `DESIGN.md` specification. Reusable visual styles
(glass cards, gradients, animations) live in `app/globals.css`.

## Adding a new page

Create a folder under `app/` with a `page.tsx` file. Example:

```
app/dashboard/page.tsx  ->  /dashboard
```
