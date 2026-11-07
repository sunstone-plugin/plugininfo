# Sunstone Information

Static marketing/info site for the Sunstone Minecraft SMP plugin. Plain HTML/CSS/JS — no build step, no framework, no bundler.

## Structure
- `index.html` — entry point
- `Pages/` — additional HTML pages
- `Static/JS/` — vanilla JS (`index.js` is the main script)
- `Static/Assets/Images/`, `Static/Assets/Fonts/`, `Static/Assets/Styling/` — static assets
- `DESIGN.md` — short design notes for the site

## Styling: Tailwind is required
- Every page must use Tailwind CSS utility classes. Do not write custom CSS files or inline `style=""` attributes unless something is truly impossible in Tailwind (and if so, prefer a small `@layer` addition over ad-hoc CSS).
- `index.html` currently loads the Tailwind CDN build (`@tailwindcss/browser@4`). The repo also has `tailwindcss` and `@tailwindcss/cli` installed as dependencies — if the project moves to a build step, compile Tailwind via the CLI instead of the CDN script, and keep every new page on the same approach (don't mix CDN and compiled output across pages).
- No other CSS frameworks (Bootstrap, Bulma, etc.) and no CSS-in-JS.

## Site theme
Modern, sleek, high-end aesthetic appropriate for presenting information (not a cluttered game-wiki look). Favor:
- Generous whitespace, clear visual hierarchy, restrained color palette
- A consistent accent color and neutral base (grays/slate) across all pages
- Clean, legible typography (Tailwind's default stack or a font from `Static/Assets/Fonts/`)
- Subtle motion/hover states over heavy animation

## Design process
Before adding a new page or major section:
1. Check existing pages for the layout patterns already in use (header/nav, spacing scale, color classes, card/section structure) and reuse them rather than inventing new ones.
2. Keep one consistent header/nav and footer treatment across all pages in `Pages/`.
3. Use a consistent Tailwind spacing/sizing scale (e.g. stick to a small set of padding/margin values) instead of arbitrary one-off values.
4. Design mobile-first; verify the page works at mobile, tablet, and desktop widths.

## Code quality
- Keep HTML semantic (`header`, `nav`, `main`, `section`, `footer`, etc.) rather than div soup.
- Keep JS in `Static/JS/`, not inline `<script>` blocks, unless trivial.
- Keep class lists readable — group related utilities (layout, spacing, color, typography) rather than random ordering.
- No dead code, no commented-out blocks left in committed files.
- Don't introduce a framework (React, Vue, etc.) or package manager dependency without discussing it first — this is intentionally a static site.
