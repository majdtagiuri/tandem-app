# Tandem — Complete Platform Master Document

> **Purpose of this file:** A single source of truth for the entire Tandem workspace-settings prototype — product idea, design system, layout, every page/tab, every UI state, every popup, every icon, every interaction, and seed data — so you do **not** need to re-read the code to understand or brief the product.

**Last audited against:** `index.html`, `app.js`, `styles.css`, `icons/`, `icons.js`, `README.md`, brand assets in `public/`.

---

## 1. What Tandem is

**Tandem** is a workspace product for studios / creative teams: invoicing, tax, and team collaboration live under one brand. This repo is a **high-fidelity interactive prototype** of **Workspace settings** — not the full product.

### Product idea (the story this UI tells)

- A workspace (`Studio Co` → `tandem.app/studio-co`) has an **owner**, **admins**, **members**, and **viewers**.
- Settings covers **identity**, **team**, and **plan & billing**.
- Roles and permissions control who can invite, bill, and change settings.
- Billing is seat-based with three plans (Solo / Studio / Agency).
- Destructive actions (remove, cancel invite, cancel plan, delete workspace, transfer ownership) always go through confirmation.

### What is actually built vs placeholder

| Area | Status |
|------|--------|
| Settings → General | Built (session-only; no backend) |
| Settings → Members | Fully interactive |
| Settings → Plan & billing | Fully interactive (in-memory) |
| Sidebar: Dashboard / Invoices / Tax | **Placeholders** (visible, non-clickable) |
| Persistence | **None** — refresh resets all in-memory state |
| Real email / Stripe / PDF export | Simulated via toasts only |

### Tech stack

- Plain **HTML / CSS / JS** (no React/Vue)
- **Vite** for local serve + production build
- Deployed as SPA via **Vercel** (`vercel.json` rewrites all routes → `index.html`)
- Icons: Phosphor Bold SVGs copied into `icons/`, embedded in `icons.js`, rendered inline via `renderIcon()`

### File map

| File | Role |
|------|------|
| `index.html` | Shell markup, all panels, all modal overlays |
| `styles.css` | Design tokens, layout, components, icon motion, responsive |
| `app.js` | State, roles, billing logic, all interactions |
| `icons/` + `icons.js` | Canonical icon set + embedded SVG registry |
| `public/` | Logo, favicon, OG image, Bogart font files |
| `scripts/regenerate-icons.mjs` | Rebuilds `icons.js` from `icons/` |

---

## 2. Brand & visual idea

### Personality

Neo-brutal / studio-tool aesthetic:

- Warm **paper** background (not pure white chrome)
- Near-black **ink** borders everywhere (`2px solid`)
- **Hard offset shadows** (no soft drop shadows)
- Tight radius (`2px`) — almost sharp corners
- Bold accent colors from a landing/marketing palette, softened only for in-app chips/fills
- Display titles in a distinctive serif (**Bogart**); UI in geometric sans (**Space Grotesk**)

### Brand assets (`public/`)

| Asset | Use |
|-------|-----|
| `BLACK_FULLLOGO_TANDEM.svg` | Sidebar brand + mobile topbar |
| `FAVICON_TANDEM.svg` | Favicon + apple-touch-icon |
| `OPEN_GRAPH_SOCIAL_TANDEM.png` | OG / Twitter social preview |
| `APPLE_MARK_TANDEM.png` | Present in public (mark asset) |
| `fonts/bogart/*.TTF` | Display face via `@font-face` |

### Page chrome / meta

- Title: `Tandem — Workspace settings`
- Description: Manage workspace members, roles, billing, and settings in Tandem.
- OG / Twitter: large image card with brand art

---

## 3. Design system — colors

All tokens live in `:root` in `styles.css`.

### Structural

| Token | Hex | Role |
|-------|-----|------|
| `--ink` | `#171412` | Primary text, borders, hard shadow color |
| `--paper` | `#FBF6EE` | App background |
| `--surface` | `#FFFFFF` | Cards, sidebar, modals, inputs |

### Brand — bold (landing DNA; also used as app accents)

| Token | Hex | Role |
|-------|-----|------|
| `--red-bold` / `--red` | `#E8362E` | Primary buttons, danger fills, active tab underline, focus ring base |
| `--teal-bold` / `--forest` | `#0F6B5C` | Payment block background |
| `--blush-bold` / `--blush` | `#F4B8C4` | Soft accents (members header wash) |
| `--chartreuse-bold` / `--chartreuse` | `#D6F23C` | Active plan badge, toast, payment CTA, active nav wash |

### Brand — calm (in-app soft fills)

| Token | Hex | Role |
|-------|-----|------|
| `--terracotta` | `#C75C4A` | Soft danger / accent fill base |
| `--teal-soft` | `#3D7F6E` | Soft teal chips |
| `--moss` | `#C3C77A` | Moss fills (payment due note) |
| `--blush-soft` | `#F0C7CF` | Soft blush fills |
| `--pending` | `#E8C84A` | Pending yellow |
| `--pending-text` | `#7A5F0A` | Pending label text |

### Text-safe variants

| Token | Hex |
|-------|-----|
| `--terracotta-text` | `#A8432E` |
| `--teal-text` | `#245C50` |
| `--moss-text` | `#5A612E` |
| `--chartreuse-text` | `#3F4A10` |

### Neutrals

| Token | Hex | Role |
|-------|-----|------|
| `--border` | `#EFE9DC` | Soft borders |
| `--border-strong` | `#D9CFC0` | Stronger neutrals / scrollbar thumb |
| `--ink-secondary` | `#6B655C` | Secondary copy |
| `--ink-muted` | `#B7AFA0` | Muted labels, inactive nav |
| `--fill-disabled` | `#D9CFC0` | Disabled fills |

### Functional / elevation

| Token | Value |
|-------|-------|
| `--focus-ring` | red-bold |
| `--overlay-scrim` | `rgba(23, 20, 18, 0.45)` |
| `--shadow-hard` | `#171412` |
| `--radius` | `2px` |
| `--elevation` | `4px 4px 0` hard shadow |
| `--elevation-sm` | `2px 2px 0` hard shadow |
| `--focus` | `0 0 0 3px` red at 28% mix |

### Derived soft fills (color-mix)

- `--teal-fill`, `--teal-stroke`
- `--moss-fill`, `--moss-stroke`
- `--pending-fill`
- `--terracotta-fill`
- `--blush-fill`
- `--chartreuse-fill`, `--chartreuse-stroke`

### Semantic color usage map

| UI | Color treatment |
|----|-----------------|
| Primary CTA | Red fill, white text, hard elevation |
| Danger confirm | Same red treatment (or terracotta outline for quieter cancel-plan) |
| Active nav item | Chartreuse wash + ink border + small elevation |
| Active settings tab | Ink text + **red** bottom underline |
| Plan Active badge | Chartreuse fill, uppercase |
| Plan Canceling badge | Red fill, white text |
| Toast | Chartreuse fill, ink text, hard elevation |
| Payment block | Forest teal background, white type, chartreuse button |
| Payment due note | Moss fill + moss text |
| Selection highlight | Soft red wash + red text |
| Input focus | Terracotta border (not blue browser default) |
| Owner role chip | Blush fill |
| Admin role chip | Terracotta fill + terracotta text |
| Member role chip | Teal fill + teal text |
| Viewer role chip | Neutral gray wash |
| Pending role chip (invite) | Pending yellow fill + pending text |
| Active status text | Teal text |
| Pending status text | Pending text |
| Inactive status text | Muted ink; row dimmed |

---

## 4. Design system — typography

### Families

| Token | Font | Source |
|-------|------|--------|
| `--font-ui` | **Space Grotesk** 400/500/700 | Google Fonts |
| `--font-display` | **Bogart** (trial TTFs) | `public/fonts/bogart/` via `@font-face` |

Bogart weights loaded: 400, 500, 600, 700, 900 — each with italic counterparts.

### Type roles

| Element | Face | Size / weight notes |
|---------|------|---------------------|
| Page title (`Workspace settings`) | Bogart | `clamp(22px–28px)`, weight 700, tight tracking |
| Panel / modal H2 | Bogart | ~18–22px, 600–700 |
| Plan name / tier name / payment value | Bogart | Display emphasis |
| Body, buttons, fields, nav | Space Grotesk | 12–14px typical |
| Uppercase micro-labels | Space Grotesk | 11–12px, letter-spacing ~0.04em |
| Sidebar note / hints | Space Grotesk | 12px muted |

### Interaction quirks (global)

- Body is `user-select: none` (Chrome UI doesn’t show caret on click)
- Text selection + caret only inside real inputs
- Custom thin scrollbars with ink borders (no arrow buttons)

---

## 5. Layout & shell

### Desktop structure (`≥ 761px`)

```
┌────────────┬──────────────────────────────────────────┐
│  SIDEBAR   │  CONTENT                                 │
│  220px     │                                          │
│  Logo      │  H1 Workspace settings                   │
│  Nav       │  Tabs: General | Members | Plan&billing  │
│            │  ──────────────────────────────────────  │
│  Note      │  Active panel (scrolls on far right)     │
│  Preview as│  content max-width ~920px inside panel   │
│  Owner|Adm │                                          │
│  |Other    │                                          │
└────────────┴──────────────────────────────────────────┘
```

- `html`/`body`/`app-shell`: full viewport height, no page scroll; **panel** scrolls
- Sidebar: white surface, ink right border
- Content padding: fluid clamps

### Mobile structure (`≤ 760px`)

```
┌─────────────────────────────────┐
│ MOBILE TOPBAR: logo + ☰ toggle  │
├─────────────────────────────────┤
│ CONTENT (full width)            │
│                                 │
│ Sidebar = off-canvas drawer     │
│ from RIGHT under topbar         │
│ + scrim backdrop                │
└─────────────────────────────────┘
```

- Hamburger animates to X when open
- Brand block inside sidebar hidden on mobile (logo is in topbar)
- Escape / backdrop / resize-to-desktop closes drawer

### Other breakpoints

| Breakpoint | Behavior |
|------------|----------|
| `≤ 980px` | Members table → stacked card-like rows; column header hidden |
| `≤ 760px` | Mobile shell + drawer |
| `≤ 480px` | Tighter spacing / tab & control density |
| Short height (`≤ 720` / `560`) | Billing/panel density clamps tighten so plan card fits |

### Z-index layers (approx)

| Layer | Approx z |
|-------|----------|
| Member drag row | 40 |
| Mobile topbar / toggle | 40–41 |
| Workspace-deleted screen | 40 |
| Mobile sidebar / backdrop | 28–30 |
| Modal overlays | 60 |
| Tooltips | 100 |

---

## 6. App chrome — sidebar & navigation

### Primary nav (sidebar)

| Item | Icon meaning | State |
|------|--------------|-------|
| Dashboard | coin | Placeholder — muted, hover “not-allowed” |
| Invoices | receipt | Placeholder |
| Tax | percent | Placeholder |
| **Settings** | gear | **Active** — chartreuse wash, ink border, elevation |

Footer copy explains placeholders and that Settings is the built area.

### Preview-as role switcher (demo control)

Segmented control at sidebar bottom:

| Mode | Meaning |
|------|---------|
| **Owner** | Full control (default). No preview note. |
| **Admin** | Can manage members, settings, billing. Cannot transfer ownership or delete workspace. Note shown. |
| **Other** | Member/Viewer preview: read-only General + Plan Details; **no Plan & billing tab**; no invite/reorder; welcome modal. |

Capability helpers:

| Capability | Owner | Admin | Other |
|------------|-------|-------|-------|
| Manage members | ✓ | ✓ | ✗ |
| Manage settings (name/URL/save) | ✓ | ✓ | ✗ (view only) |
| Manage billing | ✓ | ✓ | ✗ (summary only under General) |
| Transfer ownership | ✓ | ✗ | ✗ |
| Delete workspace (danger zone) | ✓ | ✗ | ✗ |

Switching Preview as:

- Closes all overlays
- On **Other**: activates “Casey L.” as just-joined member, switches to Members tab, opens **Welcome join** modal
- Leaving Other keeps Casey in the list for continuity

---

## 7. Content header & tabs

### Page title

- Icon: `workspace` (buildings)
- Text: **Workspace settings**

### Tabs

| Tab key | Label | Icon | Default |
|---------|-------|------|---------|
| `general` | General | faders | |
| `members` | Members | users | **Default active on load** |
| `billing` | Plan & billing | cardholder | Hidden entirely when Preview as = Other |

Tab motion: leave fade/up (~140ms) → enter fade/up (~280ms).

Active tab: bold ink + red underline.

---

## 8. Page: General

### For Owner / Admin

**Header**

- Title: General
- Sub: “Workspace identity used across invoices and invites.”

**Fields**

| Field | Default | Limits | Notes |
|-------|---------|--------|-------|
| Workspace name | `Studio Co` | max 60 | Required non-empty on save |
| Workspace URL | prefix `tandem.app/` + `studio-co` | max 40, no spellcheck | Session only |

**Hint:** Changes stay in this browser session only — not wired to a backend.

**Primary action:** Save changes → toast `Workspace settings saved` (or empty-name error toast).

**Plan Details block:** Hidden for Owner/Admin.

### For Other (Member / Viewer)

- Name/URL disabled + readonly; Save hidden; hint hidden
- Sub becomes: “You can view the workspace name, URL, and plan details.”
- **Plan Details** block shown:
  - Plan name
  - Status badge (Active / Canceling)
  - Seats used (`N of M seats used`)
- If user was on Billing when switching to Other → forced to General

### Danger zone (Owner only)

Hidden unless Preview as = Owner.

- Title + warning icon
- Sub: “Irreversible actions for this workspace.”
- Action: **Delete this workspace** — permanently remove members, invoices, billing, settings
- Button: danger + trash icon → opens Delete workspace modal

---

## 9. Page: Members

### Header

- Title: **Team members**
- Count chip (chartreuse): e.g. `3 active · 1 pending` (adds inactive when present)
- Actions (Owner/Admin only):
  - Default set: **Reorder** + **Invite**
  - Reorder mode set: **Done reordering** (sets crossfade via opacity/translate)

Other preview: header actions hidden.

### List structure

Columns (desktop): **Person | Role | Status | Permissions + actions**

Header row uses blush wash background.

### Seed members (initial state)

| ID | Name | Email | Role | Status |
|----|------|-------|------|--------|
| 1 | Majd (you) | majd@studio.co | owner | active |
| 2 | Reem K. | reem@studio.co | admin | active |
| 3 | Jordan T. | jordan@studio.co | member | active |
| 4 | sam@freelance.co | sam@freelance.co | member | pending |
| 5 | Casey L. | casey@studio.co | member | created/activated when switching to Other |

Sort order: **Owner always first**, then custom `order` (reorderable).

### Member row anatomy

1. **Drag handle** (Owner/Admin, non-owner rows) — expands only in reorder mode
2. **Avatar** — initials; pending = empty dashed circle
3. **Name + email** — pending shows `Invited · {email}`
4. **Role** — static chip for owner / pending / inactive / non-managers / reorder; otherwise editable dropdown (Viewer / Member / Admin)
5. **Status** — Active / Pending / Inactive text labels
6. **Permissions cell** (contextual):
   - Active editable member → pencil **Edit permissions**
   - Owner + current user is owner → crown **Transfer ownership**
   - Pending + manager → **Resend invite**
   - Else → em dash placeholder
7. **Actions cell**:
   - Pending + manager → X **Cancel invite**
   - Owner / reorder / non-manager → spacer
   - Else → ⋮ row menu: Deactivate/Activate + Remove

### Member statuses

| Status | Visual | Capabilities |
|--------|--------|--------------|
| `active` | Teal “Active” | Full row controls when allowed |
| `pending` | Yellow “Pending”; dashed avatar; role chip forced pending yellow | Resend / Cancel invite; no role edit; no permissions |
| `inactive` | Muted “Inactive”; row dimmed (~42% opacity on identity) | Activate / Remove via menu; no role edit; no permissions |

### Roles

| Role | Label | Tag style | Notes |
|------|-------|-----------|-------|
| owner | Owner | Blush chip | Protected; not removable via UI; not reorder-dragged; static tag |
| admin | Admin | Terracotta | Full permission preset |
| member | Member | Teal | Default invite role |
| viewer | Viewer | Neutral | Most restricted preset |

### Permission presets

Six permission keys (toggled per person without renaming role):

| Key | Label (UI) |
|-----|------------|
| `invite` | Can invite new members |
| `manageBilling` | Can manage plan & billing |
| `viewInvoices` | Can view invoices |
| `createInvoices` | Can create invoices |
| `exportReports` | Can export reports |
| `manageSettings` | Can manage workspace settings |

Defaults:

| | invite | manageBilling | viewInvoices | createInvoices | exportReports | manageSettings |
|--|:--:|:--:|:--:|:--:|:--:|:--:|
| Owner | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Member | ✗ | ✗ | ✓ | ✓ | ✗ | ✗ |
| Viewer | ✗ | ✗ | ✓ | ✗ | ✗ | ✗ |

Changing role resets permissions to that role’s preset.

### Empty state

If only the owner remains:

- Owner row still shown
- Empty row: “No teammates yet” + Invite teammate primary button

### Reorder mode

1. Click **Reorder** → toast “Drag rows to reorder · press Done when finished”
2. Drag handles expand; interactive controls swap after ~170ms
3. Pointer drag with FLIP animation; owner row not reorderable; placeholder terracotta dashed slot
4. Body cursor grabbing while dragging
5. **Done** or Escape → order saved from DOM → toast “Member order saved”

### Invite flow

Modal: **Invite a teammate**

- Email field (placeholder `name@studio.co`)
- Role dropdown:
  - Viewer: can view invoices only
  - Member: can view and edit work *(default)*
  - Admin: can manage members and settings
- Validation:
  - Empty → “Enter an email address.”
  - Invalid → “Enter a valid email address.”
  - Duplicate → “This email is already part of the workspace.”
- Success: adds pending member (name = email), toast `Invite sent to {email}`

### Other member actions & toasts

| Action | Confirm? | Toast |
|--------|----------|-------|
| Change role | No | `{name}'s role is now {Role}` |
| Resend invite | No | `Invite resent to {email}` |
| Cancel invite | Yes | `Invite to {email} cancelled` |
| Remove | Yes | `{name} removed` |
| Deactivate | Yes | `{name} deactivated` |
| Activate | No | `{name} activated` |
| Toggle permission | No | `{shortName} can now/no longer {toast phrase}` |
| Transfer ownership | Two-step yes | `{name} is now the workspace owner` |

---

## 10. Page: Plan & billing

Visible for Owner and Admin only.

### Seed billing state

| Field | Initial |
|-------|---------|
| Plan | Studio (`$29/mo`, 5 seats) · also **Free** (`$0`, 1 seat, limited) |
| Cycle | monthly |
| Status | `active` \| `canceling` \| `free` |
| Next billing date | October 12, 2026 (or `—` on Free) |
| Payment | Visa ending in 4242 · **or null** (removed / none) |
| Invoices | Six paid Studio invoices Apr–Sep 2026 (`INV-2026-04` … `09`) |

### Plans catalog

| ID | Name | Price | Seats | Features |
|----|------|-------|-------|----------|
| `free` | Free | $0 | 1 | 1 seat, View workspace only, Upgrade to unlock invites & billing tools |
| `solo` | Solo | $9/mo | 1 | 1 seat, Core invoicing, Email support |
| `studio` | Studio | $29/mo | 5 | 5 seats, Role-based access, Invoice & tax exports |
| `agency` | Agency | $79/mo | 20 | 20 seats, Advanced permissions, Priority support |

Icons: Free = gift, Solo = user, Studio = users-three, Agency = building-office.

**Seat rule:** seats used = `state.members.length` (includes pending). Cannot switch to a plan with fewer seats than current member count → block modal. Over-seat counts show terracotta emphasis on Free.

### Lifecycle: Active → Canceling → Free

1. **Cancel plan** → status `canceling`, keep current paid plan until access date, due invoice created, **Keep plan** + **End billing period** shown
2. **End billing period** (demo button) → status `free`, planId `free`, due invoices cleared, toast “Paid access ended · you're on the Free plan”
3. **Choose a plan** from Free → requires a payment method on file; then same switch/confirm/decline flow → `active`

### Free plan limitations

When `isFreePlan()`:

- Invite, reorder, role change, permissions, resend invite → blocked; toast + opens Change plan
- Cancel pending invite, remove/deactivate members, transfer ownership, general settings, delete workspace → still allowed (cleanup / ownership)
- Billing UI: muted Free badge, “No active subscription”, free note, primary CTA **Choose a plan**, no Cancel/Keep
- Change-plan modal lists paid tiers only (Free is not a selectable tier)

### Plan card (Active)

- Label: Current plan
- Name + plan icon + price line `$29/mo · Billed monthly`
- Badge: **Active** (chartreuse)
- Meta: Seats · Next billing date
- Payment block (forest teal): current card + **Payment** · or empty paper state “No payment method” + **Add card**
- Billing history preview: latest **2** invoices (clickable) + **View all**
- Actions: **Change plan** · **Cancel plan** (quieter terracotta outline style)

### Plan card (Canceling)

- Price line: `$X/mo · Cancels {date}`
- Badge: **Canceling** (red)
- Meta label: **Access until** (instead of Next billing date)
- Note: cancel copy + tip to use End billing period
- Cancel button hidden; **Keep plan** + **End billing period** shown (if manage billing)
- Creates end-of-cycle due invoice `INV-DUE` when cancel confirmed

### Plan card (Free)

- Price: `Limited access · Upgrade anytime`
- Badge: **Free** (neutral gray)
- Billing: No active subscription
- Note: invites/roles/paid features locked until upgrade
- Actions: **Choose a plan** only

### Payment modal states

- Current card display **or** “No card on file”
- **Remove payment method** text-danger control (only when a card exists) → confirm modal → `paymentMethod = null`
- Update/Add card form: name, number (auto-spaced), expiry `MM/YY`, CVC
- Brand detection: Visa / Mastercard / Amex / Card
- Due note / Free note / next charge date variants
- Pay requires a card (saved or newly entered)
- Switching to a paid plan without a card shows error on change-plan modal

### Change plan modal

- Three paid tier cards; current paid tier highlighted; Free never listed as a switch target
- Checkbox: **Simulate card decline (test)**
- Also ~20% random decline when not simulating
- Decline → error callout on change-plan modal: “Your card was declined…”
- Seat overflow → **Can't switch yet** block modal
- No payment method → error “Add a payment method before switching…”
- Confirm switch → confirm modal → success toast + unlock team controls

### Cancel / keep plan

- Cancel confirm: keep access until next billing date
- Confirm → status canceling + ensure due invoice + toast
- Keep plan → back to active, clear Due invoices, toast “Your plan will renew as usual”

---

## 11. Complete popup / overlay inventory

All modals:

- Fixed scrim overlay (`overlay--open` / `overlay--closing`, ~170ms)
- White surface, ink border, hard elevation
- Auto-injected **X close** button (cancel icon) on every modal
- Close via: X, click scrim, Escape (also closes dropdowns/row menus/reorder first)
- Sizes: default ~400px · `sm` 340 · invite 480 · permissions 420 · wide 720 · invoice 480

| Overlay ID | Title / purpose | Size | Primary actions |
|------------|-----------------|------|-----------------|
| `invite-overlay` | Invite a teammate | invite | Cancel / Send invite |
| `remove-overlay` | Remove {name}? | sm | Cancel / Remove |
| `deactivate-overlay` | Deactivate {name}? | sm | Cancel / Deactivate |
| `transfer-overlay` | Transfer ownership | default | Cancel / Transfer ownership |
| `transfer-confirm-overlay` | Transfer to {name}? | sm | Cancel / Confirm transfer |
| `cancel-invite-overlay` | Cancel invite? | sm | Keep invite / Cancel invite |
| `permissions-overlay` | Permissions for {name} | permissions + scroll | Done (live toggles) |
| `change-plan-overlay` | Change plan | wide + scroll | Close (+ tier Switch buttons) |
| `plan-confirm-overlay` | Switch to {plan}? | sm | Cancel / Confirm switch |
| `plan-block-overlay` | Can't switch yet | sm | Cancel (OK) |
| `cancel-plan-overlay` | Cancel your plan? | sm | Keep plan / Cancel plan |
| `billing-history-overlay` | Billing history | wide + scroll | Close / Export all |
| `invoice-overlay` | Invoice {number} | invoice + scroll | Back? / Pay? / Export |
| `payment-overlay` | Payment | scroll | Cancel / Pay now? / Save·Add card · Remove method |
| `remove-payment-overlay` | Remove payment method? | sm | Keep card / Remove card |
| `delete-workspace-overlay` | Delete workspace? | default | Cancel / Delete (slug-gated) |
| `welcome-join-overlay` | Welcome to Studio Co | default | Continue |

### Full-screen non-modal: Workspace gone

Triggered after successful delete confirmation.

1. **Deleting…** (~1.1s): spinner + “Deleting workspace…” + slug line
2. **Deleted:** warning icon + “Workspace deleted” + restore CTA **Bring workspace back**
3. Restore → shell returns, General tab, toast `Workspace restored`

Body class `workspace-is-deleted` while shown; app shell hidden.

### Toast

- Fixed bottom center
- Chartreuse + ink border + elevation
- Auto-hide ~2600ms
- `role="status"` live region

### Tooltips

- Floating `#app-tooltip` for `[data-tooltip]`
- Prefers top; flips bottom if clipped
- Shows on pointerover / focus; hides on leave / Escape / click / scroll / resize

---

## 12. Delete workspace flow (detail)

1. Owner clicks Delete workspace in danger zone
2. Modal: type workspace slug exactly (from URL field, fallback `studio-co`)
3. Confirm disabled until slug matches
4. On confirm: close overlays → deleting screen → deleted screen
5. Restore available (prototype undo)

---

## 13. Welcome / join demo flow

When Preview as → **Other**:

1. Ensure Casey L. exists and is `active` member
2. Switch to Members tab
3. Open welcome modal explaining Member view after accepting invite
4. Note: Casey also just accepted
5. Continue → toast `Welcome to the workspace`

---

## 14. Icons — complete catalog

### Rules (project)

- Source library (read-only): Phosphor Bold SVGs under ASSETS
- Project set: only files in `icons/`
- Runtime: inline SVG via `icons.js` — never `<img>` for these icons
- App maps semantic names → Phosphor keys via `APP_ICONS` in `app.js`
- Hover motions are meaning-specific CSS on `.icon--{meaning}`

### Semantic → Phosphor key

| Semantic name | Phosphor file key | Where used |
|---------------|-------------------|------------|
| `dashboard` | `coin-vertical-bold` | Sidebar |
| `invoices` | `receipt-bold` | Sidebar |
| `tax` | `percent-bold` | Sidebar |
| `settings` | `gear-six-bold` | Sidebar |
| `workspace` | `buildings-bold` | Page title |
| `general` | `faders-bold` | Tab |
| `members` | `users-bold` | Tab |
| `billing` | `cardholder-bold` | Tab |
| `solo` | `user-bold` | Plan Solo |
| `studio` | `users-three-bold` | Plan Studio |
| `agency` | `building-office-bold` | Plan Agency |
| `free` | `gift-bold` | Plan Free |
| `invite` | `user-plus-bold` | Invite buttons |
| `edit` | `pencil-simple-bold` | Edit permissions |
| `deactivate` | `pause-circle-bold` | Row menu |
| `activate` | `play-circle-bold` | Row menu |
| `remove` | `trash-bold` | Delete/remove |
| `reorder` | `list-dashes-bold` | Reorder |
| `manage` | `sliders-horizontal-bold` | (mapped; available) |
| `resend` | `arrow-clockwise-bold` | Resend invite |
| `check` | `check-bold` | Done reordering / Keep plan |
| `transfer` | `crown-simple-bold` | Transfer ownership |
| `card` | `credit-card-bold` | Payment |
| `swap` | `arrows-left-right-bold` | Change plan |
| `ban` | `prohibit-bold` | Cancel plan |
| `cancel` | `x-bold` | Cancel invite / modal close |
| `caret` | `caret-down-bold` | Dropdowns (flips when open) |
| `menu` | `dots-three-vertical-bold` | Row ⋮ menu |
| `export` | `export-bold` | Invoice export |
| `warning` | `warning-circle-bold` | Danger zone / deleted screen |
| `restore` | `arrow-counter-clockwise-bold` | Bring workspace back |

### Files present in `icons/` (project set)

Every semantic above maps to a `*-bold.svg` currently in `icons/` and embedded in `icons.js`. The registry must stay a 1:1 mirror of that folder (regenerate after add/swap).

### Icon hover / motion behaviors

| Icon | Motion idea |
|------|-------------|
| settings | Gear spins 180° |
| reorder | List lines drop in staggered |
| check | Tick stroke draws |
| invite | Head then body/plus pop in |
| edit | Pencil writes; stroke grows then retracts |
| transfer | Crown tips then settles |
| members | People pop in sequence |
| general | Fader knobs slide staggered |
| billing | Card slides into holder |
| remove | Trash lid hinges open |
| cancel | Error wiggle |
| deactivate | Circle fills; bars invert |
| resend | Full spin once |
| card | Swipe through reader |
| ban | Error wiggle |
| swap | Arrows exchange sides |
| solo / studio | Person(s) pop in |
| agency | Building strokes draw |
| workspace | Building pieces pop |
| tax | Slash then circles |
| invoices | Print reveal top→bottom |
| dashboard | 3D coin flip |
| caret | Rotate 180° when expanded (functional) |

---

## 15. Components library (UI building blocks)

### Buttons

| Class | Look |
|-------|------|
| `.btn` | White, ink border, hover paper |
| `.btn--primary` | Red fill, white bold, elevation; press sinks shadow |
| `.btn--danger` | Red fill (destructive confirms) |
| `.btn--text` | Borderless text link style |
| `.btn--text-danger` | Terracotta text |
| `.btn--icon` / `--icon-danger` | Compact icon-only |
| `.btn--perm` | Compact permissions/action icon button |
| `#cancel-plan-btn` override | Quiet terracotta outline (not solid red) |

### Form controls

- Labels: 12px secondary
- Inputs: ink border 2px; focus → terracotta border
- Prefixed URL input: `tandem.app/` affix on paper wash
- Custom dropdown (not native `<select>`): trigger + listbox, keyboard arrows/Home/End/Enter/Esc
- Checkboxes accent: terracotta

### Tags & badges

- Role tags / role dropdown triggers colored by role
- Status labels: text-only colored (not pill chips in status column)
- Plan badge: uppercase chartreuse or red canceling

### Members table / cards

- Hard-bordered elevated list
- Inactive / dragging / placeholder / empty-row variants
- Row menus with danger items

### Cards

- Plan card, payment block, billing history, plan details, plan tiers, invoice sheet, danger zone, workspace-gone card — all share ink border + radius + often hard shadow language

### Toast & tooltip

Documented in §11.

---

## 16. Motion & interaction timing

| Interaction | Timing / notes |
|-------------|----------------|
| Overlay open/close | ~160–170ms opacity + slight scale/translate |
| Tab panel leave/enter | 140ms leave, 280ms enter |
| Reorder handle expand / header swap | ~160–170ms |
| Drag FLIP | 220ms cubic-bezier |
| Toast lifetime | 2600ms |
| Workspace delete spinner phase | 1100ms |
| Icon hovers | 0.22–0.75s meaning-specific |
| Reduced motion | Tooltips skip transition (`prefers-reduced-motion`) |

---

## 17. Accessibility & keyboard

- Tab panels use `role="tablist" / tab / tabpanel` + `aria-selected`
- Modals: `role="dialog" aria-modal="true"` + labelledby
- Dropdowns: listbox / option / aria-expanded
- Row menus: menu / menuitem
- Escape hierarchy: sidebar → dropdown → row menu → exit reorder → close overlays
- Focus rings: red soft outline (`--focus`)
- Tooltips also on focus for icon-only controls
- Live toast status region

---

## 18. Data model (in memory)

```
state = {
  members: [{
    id, name, email, role, status, order, permissions: { ... }
  }],
  billing: {
    planId,           // solo | studio | agency
    cycle,            // monthly
    status,           // active | canceling | free
    nextBillingDate,
    paymentMethod: { brand, last4 } | null,
    invoices: [{
      id, number, date, period, planName, amount, tax, status, payment
    }]
  }
}
```

Ephemeral UI flags (not persisted): pending modal IDs, reorder mode, viewAs, dragState, dropdown/menu refs, paymentIntent, invoice navigation flags.

---

## 19. Toast message catalog (complete)

| Trigger | Message |
|---------|---------|
| Save general | Workspace settings saved |
| Empty workspace name | Workspace name can’t be empty |
| Invite sent | Invite sent to {email} |
| Resend | Invite resent to {email} |
| Cancel invite | Invite to {email} cancelled |
| Role change | {name}'s role is now {Role} |
| Remove | {name} removed |
| Deactivate | {name} deactivated |
| Activate | {name} activated |
| Permission on | {short} can now {phrase} |
| Permission off | {short} can no longer {phrase} |
| Enter reorder | Drag rows to reorder · press Done when finished |
| Exit reorder | Member order saved |
| Transfer | {name} is now the workspace owner |
| Switch plan | Switched to {Plan} plan |
| Cancel plan | Plan canceled · final payment due by {date} |
| Keep plan | Your plan will renew as usual |
| End billing period | Paid access ended · you're on the Free plan |
| Save/add card | Card updated/added · {Brand} ending in {last4} |
| Remove card | Payment method removed |
| Pay invoice | Paid {number} · {Brand} ···· {last4} |
| Upgrade lock (invite etc.) | Upgrade your plan to … (+ opens change plan) |
| No payment due | No payment due right now |
| Export one | Exported {number} as PDF |
| Export all | Exported {n} invoice(s) as PDF |
| Welcome continue | Welcome to the workspace |
| Restore workspace | Workspace restored |

---

## 20. Responsive behavior summary

| Width | Experience |
|-------|------------|
| Wide desktop | Sidebar + table columns |
| ≤980px | Members become wrapped flex cards; status absolute top-right |
| ≤760px | Mobile topbar, right drawer sidebar, stacked panels |
| Narrow / short | Clamped padding; billing denser; plan tiers may stack (CSS grid responsive rules) |

---

## 21. What’s intentionally out of scope

- Real authentication / multi-user sessions
- Backend persistence, email delivery, Stripe charges, PDF generation
- Dashboard / Invoices / Tax product surfaces (labels only)
- Changing Preview as ≠ real auth; it is a **demo role lens**
- Seat enforcement beyond plan-switch blocking (invites still add members even if over seats in this prototype)

---

## 22. How to run

```bash
npm install
npm run dev      # Vite local
npm run build    # → dist/
npm run preview
```

Vercel: Vite framework, `dist` output, SPA rewrite.

---

## 23. One-page mental model

**Tandem Settings** is a neo-brutal studio admin surface on warm paper with ink outlines and hard shadows. You live in three tabs — identity, team, billing — and a sidebar Preview-as switcher lets you see Owner, Admin, and Member/Viewer realities. Members carry roles, statuses, and per-person permissions; billing is a seat-capped three-tier plan with payment, invoices, cancel/keep, and decline simulation. Every destructive path confirms in a modal; feedback lands in chartreuse toasts. Icons are inline Phosphor Bold with playful meaning-specific hover motion. Nothing persists past refresh — this is the complete interactive prototype of workspace settings for the challenge.

---

*End of master document. If product behavior changes, update this file in the same PR so it remains the non-code source of truth.*
