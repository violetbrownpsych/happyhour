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
No automated tests. Test by opening `index.html` in a browser at localhost (`python3 -m http.server 8080`). Key things to verify manually:
- Filter pills (day, time) select/deselect correctly — clicking an active pill deselects it
- Cards render with correct badge states (Ending, Starts in, Ended today)
- Map loads and markers sync with card list
- Mobile layout (≤899px breakpoint) — pill rows scroll horizontally, time row swaps
- Quick view (QV) opens on card click, swipe-to-dismiss on mobile
- Append `?theme=night` / `?theme=morning` / `?theme=day` to test header themes

## File structure
```
index.html        — all CSS, HTML, and JS (single file)
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
- CSS custom properties (variables) defined in `:root` — prefer variables for colors when they exist. The full palette is now variabilized (see Key CSS variables below).
- Mobile breakpoint: `@media (max-width:899px)` — this block is at the **end** of the stylesheet.
- Small-screen override: `@media (max-width:600px)` for padding adjustments.
- Desktop map layout: `@media (min-width:900px)`.
- Filter bar uses `position:sticky; top:0; z-index:100`.
- Card grid uses CSS Grid with `auto-fill, minmax(290px, 1fr)`.
- Inactive pills have a subtle raised shadow; active pills have a colored raised shadow — both look like buttons.

### Fonts
- **Bebas Neue** — `POURS` header wordmark
- **Anton** — card `.venue-name`, QV `.qv-name`
- **DM Sans** — UI chrome, filter bar, pills, `.neighborhood`, `.card-link`, body text
- **Playfair Display** — results heading

All four are loaded via the Google Fonts `<link>` in `<head>`. Special Elite and Archivo Narrow were planned early on but are not used in the current CSS.

### Key CSS variables (current theme)
```css
--bg: #060f1e              /* page background — very dark navy */
--bg-filter: #091620       /* filter bar, summary bar, footer — very dark teal */
--bg-elevated: #0d1d28     /* dropdown panels — dark teal */
--cream: #FAF6EF           /* header bg (day), card bg */
--cream-dk: #EDE5D8        /* QV handle bar, close button, map placeholder */
--green: #243D1A           /* active filter chip background */
--sienna: #BF2338          /* crimson — eyebrow, time pills, neighborhood, card links, deal dots */
--ink: #1A1410             /* dark brown text on cream surfaces */
--ink-lt: #5A4A3A          /* secondary text on cream surfaces */
--shadow: rgba(0,0,0,.35)  /* card drop shadow */
--radius: 14px             /* card border radius */
--filter-text: rgba(245,240,232,.82)   /* bright text on dark filter bar */
--filter-dim:  rgba(245,240,232,.62)   /* dim text — labels, toggles, summary bar */
--filter-border: rgba(245,240,232,.11) /* borders on dark filter bar */
--lime: #6ea900            /* live time, day pills, vibe active, slider, verified, FAB, footer links */
--lime-dk: #5a8800         /* day/today pill border, vibe active border */
--lime-dkst: #2e4800       /* FAB background */
--lime-hover: #3a5a00      /* FAB hover */
--lime-tint-bg: rgba(110,169,0,.1)    /* verified badge background (QV) */
--lime-tint-border: rgba(110,169,0,.25) /* verified badge border (QV) */
--crimson-dk: #9a1c2c      /* time pill active border */
--crimson-dkst: #8b1a27    /* deal tag text, card link hover */
--navy-mid: #1a5fa0        /* neighborhood pill active */
```

See handoff.md for the full color system.

### Body background
Plain `#060f1e` (very dark navy) with a very subtle SVG fractal noise texture via `body::before` (fixed, pointer-events none, ~2% visible opacity). Adds slight grain to the dark background.

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
- `applyHeaderTheme()` runs on load and every 60s. It sets CSS variables AND sets inline styles directly on `header`, `header h1`, `header p.tagline`, and `.logo-eyebrow` for the late-night color/glow effect. Don't override those inline styles in CSS without accounting for this.
- The `.hbg`/`.hstars`/`.deco` elements are hidden via `display:none !important` in CSS — don't remove that. They are legacy background layers kept in the JS but not rendered.
- Time-of-day thresholds in `getTimeBlend()`: morning 6–11am, standard noon–7pm, transition 7–8pm, fully evening at 8pm. `?theme=night/morning/day` URL param overrides for testing.
- `badgeColors(n)` interpolates badge color green→amber→red based on minutes remaining. The `t` value is clamped to `[0,1]` — without this, long sessions (e.g. 150 mins) produce negative `t` and overshoot into cyan/teal.
- Time bar background is `var(--bg)` — always matches the page background, no time-of-day variation.
- `self.skipWaiting()` in `sw.js` ensures the service worker activates immediately. Bump `CACHE` version string when assets change significantly.
- Day pills: `activeDays === 'today'` OR `activeDays === todayAbbr()` both mean "today" — check both.
- Clicking an active day or time pill deselects it (resets to `'any'`). Both desktop and mobile pill handlers have this check.
- End times are **exclusive** (a session ending at 1700 is over at exactly 5:00 PM).
- `venueMatchesTime()` must only test sessions that match the active day — otherwise a Mon–Fri morning session can make a venue appear on Saturday morning filter. The fix is already in place: filter by day inside `venueMatchesTime` before testing the time window.
- Deals and Vibe collapsible panels have no "All" button — no selection = all (same as Neighborhood). Don't add one back.
- `filter-clear-btn` appears when `activeNeighborhoods.size || activeDealTags.size || activeVibeTags.size || activeDays !== 'today' || activeTime !== 'any'`. It clears all three sets AND resets day/time. Visibility is updated in `render()`.
- **Mobile filter bar is NOT sticky** (`position: relative` inside `@media (max-width:899px)`). It scrolls off naturally — compositor-driven, no JS scroll-linking. An `IntersectionObserver` fires when it exits the top of the viewport, adds `scroll-collapsed` (`visibility: hidden` to hold space), then does `display: none` + synchronous `scrollBy` compensation to remove its height without a visible jump. Desktop uses a scroll-linked `translateY` animation (separate code path in `checkScrollCollapse`). Don't add `position: sticky` back to mobile without rethinking the whole collapse flow.
- QV sheet uses `max-height: 92vh; max-height: 92svh` — the `svh` unit keeps it within the visual viewport on iOS Safari when the URL bar is visible. Don't remove the `svh` line.
