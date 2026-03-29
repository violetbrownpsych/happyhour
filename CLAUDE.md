# Pours — Claude Code Instructions

## Project overview
Single-page happy hour directory for Minneapolis/St. Paul (`pours.app`). All application code is in one file: `index.html`. No build step, no package manager, no framework.

## Build & deploy
There is no build step. To deploy:
1. Edit `index.html` (and/or `happyhours.csv`)
2. Commit and push to `main` branch on GitHub (`violetbrownpsych/pours`)
3. Cloudflare Pages auto-deploys on push
4. Purge Cloudflare cache after deploy if changes need to be visible immediately

**Service worker** (`sw.js`) uses stale-while-revalidate caching. Version string is `CACHE = 'pours-v1'` — bump this when breaking changes need to invalidate cached assets.

## Testing
No automated tests. Test by opening `index.html` in a browser at localhost. Key things to verify manually:
- Filter pills (day, time) select/deselect correctly
- Cards render with correct badge states (Ending, Starts in, Ended today)
- Map loads and markers sync with card list
- Mobile layout (≤899px breakpoint) — pill rows scroll horizontally, time row swaps
- Quick view (QV) opens on card click, swipe-to-dismiss on mobile

## File structure
```
index.html        — all CSS, HTML, and JS (single file, ~1600 lines)
happyhours.csv    — venue data (pipe-delimited multi-value fields)
sw.js             — service worker
manifest.json     — PWA manifest
icon-192.png      — app icon
icon-512.png      — app icon (large)
tos.html          — terms of service page
handoff.md        — design handoff notes for current redesign session
```

## Coding style

### General
- **No framework, no build tools, no npm.** Vanilla JS, plain CSS, plain HTML.
- Everything lives in `index.html`. Avoid creating new files unless absolutely necessary.
- External libraries loaded via CDN: PapaParse (CSV parsing), Leaflet (maps).
- Google Fonts loaded via `<link>` in `<head>`.

### JavaScript
- ES5 style throughout (`var`, `function() {}`, no arrow functions, no `const`/`let`, no template literals).
- No classes. Functions are top-level or defined inline as needed.
- DOM manipulation is direct (`getElementById`, `querySelector`, `innerHTML`).
- State variables are global: `activeDays`, `activeTime`, `sliderValue`, `VENUES`, etc.
- `activeDays` is a **string** — either `'today'` or a day abbreviation like `'Mon'`. Not a Set, not an array.
- `activeTime` is a string: `'any' | 'now' | 'morning' | 'lunch' | 'hh' | 'late' | 'pick'`
- Event listeners are added in `setup*` functions called from `init()`.
- `render()` is the main re-render function — call it after any state change.
- Times are stored as 24hr integers: `1600` = 4:00 PM, `2130` = 9:30 PM, `0` or `0000` = midnight.
- Midnight-crossing sessions: `endTime < startTime` (e.g., `startTime: 2130, endTime: 0`).

### CSS
- CSS custom properties (variables) defined in `:root` — always use variables for colors, not hard-coded hex values in rules.
- Mobile breakpoint: `@media (max-width:899px)` — this block is at the **end** of the stylesheet.
- Small-screen override: `@media (max-width:600px)` for padding adjustments.
- Desktop map layout: `@media (min-width:900px)`.
- Filter bar uses `position:sticky; top:0; z-index:100`.
- Card grid uses CSS Grid with `auto-fill, minmax(290px, 1fr)`.
- Pill active states use no `box-shadow` (flat) to distinguish from inactive (subtle shadow).

### Key CSS variables (current dark/noir theme)
```css
--bg: #111111              /* page background */
--bg-filter: #1A1A1A       /* filter bar */
--bg-elevated: #242424     /* dropdown panels */
--cream: #FAF6EF           /* header bg, card-adjacent light surfaces */
--sienna: #BF2338          /* crimson/lipstick — primary accent */
--amber: #D4953A           /* warm secondary accent (day pill active) */
--ink: #1A1410             /* dark text (on light/card surfaces) */
--filter-text: rgba(245,240,232,.82)   /* text on dark filter bar */
--filter-dim:  rgba(245,240,232,.42)   /* dim text on dark filter bar */
--filter-border: rgba(245,240,232,.11) /* borders on dark filter bar */
```

### CSV data format
```
name,neighborhood,city,days,startTime,endTime,deals,dealTags,vibe,website,mapsUrl,accentColor,lat,lng,verified
```
- Multi-value fields use `|` as separator (e.g., `Mon|Tue|Wed`)
- Multiple rows with the same `name` = multiple sessions for one venue
- Only the first row needs neighborhood/city/vibe/lat/lng etc.; continuation rows leave those blank
- `verified` format: `"Name on MM/DD/YYYY"` (e.g., `"Violet on 03/27/2026"`)

### Things to be careful about
- `init()` call order matters: time mode must be set before first `render()` — don't add premature renders.
- `applyHeaderTheme()` runs on load and sets CSS variables dynamically via JS (`--header-accent`, `--timebar-bg`). The `hbg`/`hstars`/`.deco` elements are hidden via `display:none !important` in CSS — don't remove that.
- `self.skipWaiting()` in `sw.js` ensures the service worker activates immediately. Bump `CACHE` version string when assets change significantly.
- Day pills: `activeDays === 'today'` OR `activeDays === todayAbbr()` both mean "today" — check both.
- Clicking an active day or time pill should deselect it and reset time to `'any'`. Both the desktop and mobile pill handlers need this check.
- End times are **exclusive** (a session ending at 1700 is over at exactly 5:00 PM).
