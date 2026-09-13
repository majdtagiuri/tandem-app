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

## About the fonts
- UI text uses **Space Grotesk** (Google Fonts) — matches the brand direction.
- The sidebar wordmark uses **Fraunces** as a stand-in. The actual brand typeface is **Bogart**, which isn't on Google Fonts — if you have a licensed copy, add the font files to a `fonts/` folder, add an `@font-face` rule at the top of `styles.css`, and swap `--brand-word` font-family to it.

## Structure
```
index.html    structure and markup
styles.css    all styling (palette variables at the top)
app.js        state + interactions (no framework, no build tool)
```

All data is in-memory (the `state.members` array at the top of `app.js`) — refreshing the page resets it.
