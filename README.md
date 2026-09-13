# Tandem — workspace settings prototype

A plain HTML/CSS/JS prototype served locally with Vite.

## How to run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## What's actually built
- **Members tab**: invite (email validation + duplicate check), change role, resend invite, cancel invite with confirm, remove member with confirm, member count, sorted list, empty state, and a protected owner row.
- **General**: session-only workspace name/URL fields (save toast; no backend).
- **Plan & billing**: static current-plan card so the tab isn't empty.

## What's intentionally a placeholder
- **Sidebar**: Dashboard, Invoices, and Tax are static labels — kept so Settings reads as part of a real app.
- Billing actions and real persistence aren't in scope.

## About the brand visuals
- Palette tokens live at the top of `styles.css` (paper `#FBF6EE`, landing bold red/teal/chartreuse/blush, calm in-app soft fills) with thick ink borders and hard offset shadows.
- UI text: **Space Grotesk** (Google Fonts). Display titles: **Bogart** from `public/fonts/bogart/` via `@font-face` → `--font-display`.

## Structure
```
index.html    structure and markup
styles.css    all styling (palette variables at the top)
app.js        state + interactions (no framework, no build tool)
```

All data is in-memory (the `state.members` array at the top of `app.js`) — refreshing the page resets it.
