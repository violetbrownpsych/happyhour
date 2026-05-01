# Pours — Defaults & Design Reference
_Last updated: 2026-03-31 (morning theme added)_

---

## Typography

### Fonts in use

| Font | Style | Where loaded |
|------|-------|--------------|
| **Bebas Neue** | Display, condensed, all-caps | Google Fonts `<link>` |
| **Anton** | Display, condensed | Google Fonts `<link>` |
| **Playfair Display** | Serif, editorial | Google Fonts `<link>` |
| **Special Elite** | Typewriter / slab serif | Google Fonts `<link>` |
| **Archivo Narrow** | Condensed sans | Google Fonts `<link>` |
| **DM Sans** | Clean sans, UI chrome | Google Fonts `<link>` |

### Font assignments

**Bebas Neue**
- `header h1` — "POURS" wordmark

**Anton**
- `.venue-name` — venue name on cards
- `.qv-name` — venue name in quick view sheet

**Playfair Display**
- `#results-heading` — results heading ("Happy Hours on Tuesday")
- `.h-label` — "Happy Hours" part of results heading
- `.h-day` — day/date part of results heading
- `.popup-name` — venue name in map popup
- `.empty h3` — empty-state heading

**Special Elite**
- `.deal-item` — deal lines on cards
- `.qv-deal-item` — deal lines in quick view

**Archivo Narrow**
- `.status-badge` — "Ends in…" / "Starts in…" badges
- `.hours-text` — hours on cards and in QV
- `.days-text` — days on cards and in QV
- `.card-verified` — verified label on cards
- `.qv-verified` — verified label in QV
- `.tag-deal`, `.tag-vibe` — deal and vibe tags on cards
- `.qv-deal-tag`, `.qv-vibe-tag` — tags in quick view

**DM Sans**
- `body` — base page text
- `#search` — search input
- `.collapsible-toggle` — Neighborhood / Deals / Vibe filter toggles
- `.city-toggle` — city toggle in neighborhood filter
- `.pill` — all filter pills (day, time, neighborhood, deal, vibe)
- `.card-link` — Map / Website links on cards
- `.neighborhood` — neighborhood text on cards
- `#fab` — Map / List floating action button
- `.h-time` — time in results heading
- `#summary-time` — time in summary bar
- `.leaflet-popup-content-wrapper` — map popup container
- `.popup-open-btn` — "See details" in map popup
- `#footer-home`, `footer a` — footer links
- Filter bar labels, toggles, search row, summary bar, QV links

---

## Color System

### 5 base colors

| Name | Hex | Role |
|------|-----|------|
| **Crimson** | `#BF2338` | Primary accent — calls to action, active time pills, deal accents |
| **Maroon** | `#6F263D` | Secondary warm accent — American/Italian card strips |
| **Dark teal** | `#1b3644` | Dark UI surfaces — filter bar, summary bar, footer |
| **Dark navy** | `#082b52` | Darkest backgrounds — page bg, time bar |
| **Lime** | `#6ea900` | Energy accent — day pills, slider, live time, vibe filter, FAB, verified |

---

### Crimson family (`#BF2338`)

| Hex | Variant | Used on |
|-----|---------|---------|
| `#BF2338` | Base (`--sienna`) | `.logo-eyebrow` (Twin Cities eyebrow), `.neighborhood` text on cards, `.card-link` (Map/Website), `.deal-dot` bullet dots, `.qv-deal-dot`, active time pills (`.pill.time-active`, `.pill.time-active-now`, `.pill.pick-active`), `#filter-clear-btn`, `.collapsible-toggle.has-active`, `.active-badge` bg, `.popup-open-btn`, `#deal-pills .pill.tag-active`, `.tag-deal.tag-active` |
| `#E8556A` | Lighter | Natural Wine / Mexican / Japanese card top accent strip |
| `#9a1c2c` | Darker | Active time pill border |
| `#8b1a27` | Darkest | `.card-link:hover`, deal tag text |
| `rgba(191,35,56,.06)` | Tint | Deal tag background |
| `rgba(191,35,56,.12)` | Tint hover | Deal tag hover background |

### Maroon family (`#6F263D`)

| Hex | Variant | Used on |
|-----|---------|---------|
| `#6F263D` | Base | American / Italian card top accent strip |

### Dark teal family (`#1b3644`)

| Hex | Variant | Used on |
|-----|---------|---------|
| `#091620` | Very dark (`--bg-filter`) | Filter bar bg, summary bar bg, footer bg |
| `#0d1d28` | Dark (`--bg-elevated`) | Dropdown / collapsible panel bg |
| `#1b3644` | Base | (reference only — no direct CSS use) |
| `#1a9db5` | Brightened | Cocktail Bar / French card top accent strip |
| `#3ebfd8` | Lightest | Hotel Bar / Mediterranean card top accent strip |
| `#1a5fa0` | Blue variant | Active neighborhood filter pills |

### Dark navy family (`#082b52`)

| Hex | Variant | Used on |
|-----|---------|---------|
| `#060f1e` | Very dark (`--bg`) | Page background, time bar background, "POURS" wordmark (day color) |
| `#082b52` | Base | (reference only) |
| `#1565c0` | Bright | Restaurant card top accent strip |
| `#4a9fd4` | Brightest | Rooftop card top accent strip |

### Lime family (`#6ea900`)

| Hex | Variant | Used on |
|-----|---------|---------|
| `#6ea900` | Base | `#live-time`, `.pill.day-active` / `.pill.today-active` bg, `#vibe-pills .pill.tag-active`, `.thumb-label-above`, `.card-verified`, `.qv-verified`, `.tip-link`, `footer a`, `#footer-home` |
| `#7bc500` | Brighter | Brewery/Taproom card top accent strip |
| `#4a8a00` | Darker | Pub/Dive card top accent strip |
| `#5a8800` | Dark border | Active day pill border |
| `#2e4800` | Very dark | `#fab` background |
| `#3a5800` | Dark | `#fab` hover background |
| `rgba(58,92,40,.06)` | Tint | Vibe tag background |
| `rgba(58,92,40,.12)` | Tint hover | Vibe tag hover background |

### Non-palette colors

| Hex / value | Role |
|-------------|------|
| `#FAF6EF` (`--cream`) | Header bg (day), card bg |
| `#1A1410` (`--ink`) | Dark brown text on cream surfaces |
| `#1a0d0a` | Header bg at full late-night |
| `#3A5C28` (`--green-lt`) | Vibe tag `.tag-active` on cards (legacy) |
| `#D4953A` (`--amber`) | Defined in `:root`; used by `applyHeaderTheme()` for `--header-accent`; not directly visible |
| `rgba(245,240,232,.82)` (`--filter-text`) | Bright text on dark filter bar |
| `rgba(245,240,232,.62)` (`--filter-dim`) | Dim text — labels, toggles, summary bar |
| `rgba(245,240,232,.11)` (`--filter-border`) | Borders on dark filter bar |
| `#FEF3C7` / `#92400E` | "Starts in…" badge (amber bg / dark brown text) |
| `rgba(0,0,0,.1)` / `rgba(0,0,0,.4)` | "Ended today" badge |

---

## Behavioral Defaults

### Time filter

- **On load:** checks if any venue is currently open (`isOpenNowRange()` across all sessions).
  - Any venue open → default to **Happening Now** (`activeTime = 'now'`)
  - No venues open → default to **Any Time** (`activeTime = 'any'`)
- **Slider default position:** 5 PM (`sliderValue = 17`). Only visible when "Pick a time" pill is selected.
- Only one time pill can be active at a time.

### Day filter

- Always defaults to **Today** (`activeDays = 'today'`).
- Clicking an already-active day pill deselects it (resets to `'today'`).
- Only one day pill can be active at a time.
- A venue passes the day filter if **any** of its sessions includes the selected day.

### Filter logic

| Filter | Logic |
|--------|-------|
| Day | Venue passes if **any** session includes the selected day |
| Time | Venue passes if **any** session overlaps the selected time window |
| Neighborhood | Venue passes if it matches **any** selected neighborhood (OR) |
| Deal tags | Venue must match **all** selected deal tags (AND) |
| Vibe tags | Venue must match **all** selected vibe tags (AND) |
| Search | Matches venue name, neighborhood, or deal text (substring) |

All active filters must pass simultaneously.

### Time boundary rules

- **Start time is inclusive:** a session starting at 5 PM shows when slider = 5 PM or when current time = 5:00 PM.
- **End time is exclusive:** a session ending at 6 PM does NOT show at slider = 6 PM or when current time = exactly 6:00 PM.
- Applies to both "Pick a time" slider and "Happening Now."

### Clear filters button

Appears (next to "Hide filters") when any of the following are active:
- Any neighborhood / deal tag / vibe tag selection
- Day is not Today
- Time is not Any Time

Clears all selections and resets day → Today, time → Any Time.

---

## Scroll collapse behavior

- Filter bar **collapses** when scrolling **down** past the filter bar height threshold (`filterBarFullHeight`, computed from header + time bar + filter-wrap heights).
- Filter bar **never auto-expands** — only expands when the user clicks the summary bar.
- **500ms cooldown** (`lastToggleTime`) between collapse/expand toggles — debounces rapid scroll events that could cause flickering.
- **`forcedOpen` flag:** set to `true` when the user manually clicks the summary bar to re-expand filters. Prevents `checkScrollCollapse` from immediately re-collapsing because the scroll position is still past the threshold. Resets to `false` when the user scrolls back up past the threshold (allowing normal auto-collapse to resume).

---

## Badge logic & card sort order

### Badge types (priority order)

| Rank | Type | Condition | Color |
|------|------|-----------|-------|
| 0 | **Ending** | Session currently active (`minsLeft > 0`) | Green → amber → red (by `badgeColors(n)`) |
| 1 | **Starts in** | Session starts within 30 minutes | Amber (`#FEF3C7` / `#92400E`) |
| 2 | **None** | No session active or starting soon | — |
| 3 | **Ended today** | All sessions ended for the day | Dimmed gray |

`badgeColors(n)` interpolates green→amber→red based on minutes remaining, clamped to `[0,1]` to prevent overshoot for long sessions.

### Card sort order

1. **Ending (rank 0)** — sorted by **most time remaining first** (descending `minsLeft`)
2. **Starting soon (rank 1)** — sorted by **soonest start first** (ascending `minsLeft`)
3. **No badge (rank 2)** — CSV order (no secondary sort)
4. **Ended today (rank 3)** — CSV order (no secondary sort)

### Starting-soon threshold

A session shows a "Starts in…" badge if it begins within **30 minutes** of the current time.

---

## Map mode

- **Entering map mode:** scrolls to top, then locks `body { overflow: hidden }`. This prevents the page from scrolling while the sticky map panel + scrollable card list are side by side; only the card list panel (which has its own `overflow-y: auto`) can scroll independently.
- **`mapReady` flag:** set to `false` on map entry, then set to `true` after a **300ms delay**. Prevents `onMapMoved` from firing before markers are placed.
- **Mobile:** filters collapse automatically when entering map mode.
- **Desktop:** card list filters by map bounds as you pan.
- `overflow: hidden` is removed from `body` when exiting map mode.

---

## Timezone

All time calculations use `CITY_TIMEZONE = 'America/Chicago'`. The visitor's local time is never used.

---

## Header theme system

`applyHeaderTheme()` runs on page load and every 60 seconds. It computes a blend object `{morning, standard, evening}` from `getTimeBlend()` and applies inline styles to `header`, `header h1`, `header p.tagline`, and `.logo-eyebrow`.

### Time thresholds (all times Central, `CITY_TIMEZONE`)

| Time | Event |
|------|-------|
| 12:00am–6:00am | Full night |
| 6:00am–7:00am | Night → morning transition |
| 7:00am–11:00am | Full morning |
| 11:00am–12:00pm | Morning → standard transition |
| 12:00pm–7:00pm | Full standard |
| 7:00pm–8:00pm | Standard → night transition |
| 8:00pm–12:00am | Full night |

Variable names in code: `MS=360, ME=420, SS=660, SE=720, ES=1140, EE=1200` (minutes since midnight).

### Standard (day)
- Header background: cream `#FAF6EF`
- POURS text: dark navy `#060f1e`
- No glow on POURS or eyebrow

### Morning
- Header background: cream `#FAF6EF` (same as standard)
- POURS text: dark navy `#060f1e` (same as standard)
- POURS text-shadow (blue-dawn glow, scales with `mor` 0→1):
  - `0 0 4px rgba(180,220,255, mor×0.80)` — ice white tight core
  - `0 0 25px rgba(80,150,220, mor×0.78)` — cornflower mid bloom
  - `0 0 70px rgba(50,100,180, mor×0.58)` — sky blue outer wash
  - `0 0 130px rgba(30,60,140, mor×0.38)` — pre-dawn wide haze
- Eyebrow text-shadow: `0 0 10px rgba(80,150,220, mor×0.38)`
- Test with: `?theme=morning`

### Night
- Header background: lerps cream `#FAF6EF` → dark charcoal `#1a0d0a` (scales with `eve` 0→1)
- POURS text: lerps dark navy `#060f1e` → cream `#FAF6EF`
- POURS text-shadow (crimson neon glow, scales with `eve` 0→1):
  - `0 0 4px rgba(255,190,120, eve×0.90)` — warm orange-white tight core
  - `0 0 15px rgba(191,35,56, eve×0.80)` — crimson mid bloom
  - `0 0 40px rgba(191,35,56, eve×0.55)` — crimson outer halo
  - `0 0 80px rgba(191,35,56, eve×0.30)` — wide crimson haze
- Eyebrow text-shadow: `0 0 10px rgba(191,35,56, eve×0.60)`
- Tagline color lerps warm brown → cream (tracks with `eve`)
- Test with: `?theme=night`

### Night → morning transition (6–7am)
Both shadow sets apply simultaneously (comma-stacked in CSS). Crimson fades out as blue rises — briefly overlaps as warm purple-violet, mimicking a real sunrise color shift.

### Dev URL params
`?theme=morning` · `?theme=day` · `?theme=night`

---

## Service worker / cache

- Cache name: `pours-v1` in `sw.js`.
- Strategy: stale-while-revalidate.
- **Bump the cache version string** after any breaking asset change to force clients to invalidate.

---

## Known issues (as of 2026-03-31)

- ~~`manifest.json` still has old `theme_color: "#3A5C28"`~~ — fixed, now `#060f1e`.
- `YOUREMAIL@example.com` placeholder in empty-state JS needs a real address.
- CSS color palette is mostly hardcoded hex values — a future pass should define them as `:root` variables.
- Mobile: card tops can be clipped at scroll position 0 (not yet fully diagnosed).
