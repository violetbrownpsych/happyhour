# Pours — Handoff Notes
_Last updated: 2026-03-31_

## What this project is
Single-page happy hour directory for Minneapolis/St. Paul. All code lives in `index.html` (CSS + HTML + JS). Data is in `happyhours.csv`. No build step, no framework.

## Current branch
`newvibe` — visual redesign in progress. Not yet merged to main.

---

## Color system

### 5 base colors
| Base | Hex | Role |
|------|-----|------|
| Crimson | `#BF2338` | Primary accent — Twin Cities eyebrow, time pills, neighborhood text, card links, deal dots, clear button |
| Maroon | `#6F263D` | Secondary warm accent — American, Italian card strips |
| Dark teal | `#1b3644` | Dark UI surfaces — filter bar, summary bar, footer |
| Dark navy | `#082b52` | Darkest backgrounds — page bg, time bar |
| Lime | `#6ea900` | Energy accent — day pills, slider, live time, vibe filter, FAB, footer links, verified text |

### Variations and mappings

**Crimson (`#BF2338`)**
- `#E8556A` — lighter (Natural Wine, Mexican, Japanese card strips)
- `#9a1c2c` — darker border (time pill active border)
- `#8b1a27` — darkest (deal tag text color)

**Maroon (`#6F263D`)**
- Used directly for American, Italian card strips only

**Dark teal (`#1b3644`)**
- `#091620` — very dark (filter bar `--bg-filter`, summary bar, footer background)
- `#0d1d28` — dark (dropdown/elevated panels `--bg-elevated`)
- `#1a9db5` — brightened (Cocktail Bar, French card strips)
- `#3ebfd8` — lightest (Hotel Bar, Mediterranean card strips)

**Dark navy (`#082b52`)**
- `#060f1e` — very dark (page background `--bg`, time bar background, POURS wordmark day color)
- `#1a5fa0` — mid (neighborhood filter pill active)
- `#1565c0` — bright (Restaurant card strip)
- `#4a9fd4` — brightest (Rooftop card strip)

**Lime (`#6ea900`)**
- `#7bc500` — brighter (Brewery/Taproom card strip)
- `#4a8a00` — darker (Pub/Dive card strip)
- `#5a8800` — dark border (day pill active border)
- `#2e4800` — very dark (FAB background)
- `#3a5800` — dark (FAB hover)

### Non-base palette colors still in use
- `#FAF6EF` (`--cream`) — header bg (day), card bg, header text at night
- `#1A1410` (`--ink`) — dark brown text on cream card surfaces
- `#1a0d0a` — very dark warm charcoal (header bg at full late-night)
- `#3A5C28` (`--green-lt`) — vibe tag `.tag-active` on cards (legacy — may align to lime in future)
- `#D4953A` (`--amber`) — defined in `:root`, used by `applyHeaderTheme()` JS for `--header-accent`; not actively visible in UI

---

## State of the redesign (what's done)

### Page background
Plain `#060f1e` (very dark navy-black). No image or texture.

### Header
**Day (before 7pm):** Cream `#FAF6EF`. `POURS` wordmark in Bebas Neue (~7rem), color `#060f1e`. "TWIN CITIES" eyebrow in crimson `#BF2338`. Tagline: "Happy hours, hand picked." in dim dark brown.

**Late night (7pm → 8pm transition, fully at 8pm):** Header background lerps from cream → very dark warm charcoal `#1a0d0a`. "POURS" text lerps from dark navy → cream. Neon glow text-shadow builds on "POURS": warm orange-white tight core, crimson mid bloom, soft crimson outer halo. "TWIN CITIES" eyebrow stays crimson but gains a subtle crimson text-shadow glow. Tagline color lerps to stay readable on dark background. Transition is driven by `applyHeaderTheme()` running on load and every 60 seconds.

**Dev theme toggle:** Append `?theme=night`, `?theme=morning`, or `?theme=day` to any URL to force a time-of-day state for testing.

### Time bar (below header)
`var(--bg)` = `#060f1e` — blends seamlessly with page background. Live time shown in lime `#6ea900`. Always the same color regardless of time of day.

### Filter bar + summary bar
Background `#091620` (very dark teal, `--bg-filter`). Dropdown panels `#0d1d28` (`--bg-elevated`). Labels (Day, Time, Neighborhood, Deals, Vibe), collapsibles, Hide Filters all use `--filter-dim` at `.62` opacity.

**Active pill colors:**
- Day / Today pills → lime `#6ea900`, darker border `#5a8800`
- All time pills (including Happening Now) → crimson `#BF2338`, darker border `#9a1c2c`
- Slider thumb + label → lime `#6ea900`

**Collapsible filter panel active states:**
- Neighborhood → blue `#1a5fa0`
- Deals → crimson `#BF2338`
- Vibe → lime `#6ea900`

**Deals and Vibe panels:** No "All" button. No selection = all (same behavior as Neighborhood). Click to narrow, click again to deselect.

**Spot count:** Shows to the right of Vibe in the collapsibles bar on both desktop and mobile. Also shows in desktop summary bar (via `results-count`). On mobile summary bar, shows as a second line below "Change Filters."

**Clear filters:** Appears as "Clear [×]" next to "Hide Filters" (crimson, smaller text) when any of these are active: neighborhood/deals/vibe selections, non-Today day, non-Any time. Clears all of the above and resets day to Today, time to Any.

### Cards
Cream `#FAF6EF` background, no border, `border-radius:14px`. Drop shadow for depth. 5px color accent strip at top keyed to primary vibe (via `VIBE_COLORS` / `VIBE_PRIORITY`). Neighborhood text and Map/Website links in crimson `#BF2338`.

**Deal bullet dots:** Crimson `--sienna` (matches QV dots).
**Verified text:** Lime green `#6ea900`, bottom right of card.
**Deal tags:** Rectangular (`border-radius:3px`), red tint bg, dark red text `#8b1a27`.
**Vibe tags:** Pill-shaped (`border-radius:99px`), green tint bg, dark green text `#243d18`.

**"Ends in..." badge:** Colors blend green → amber → red based on minutes remaining. `badgeColors(n)` clamps interpolation to `[0,1]` — without this, sessions with lots of time remaining would overshoot to teal/cyan.

### FAB (Map/List toggle)
Dark lime `#2e4800`, hover `#3a5800`.

### Footer
Background `var(--bg-filter)` = `#091620` (matches filter bar). Links in lime `#6ea900`, hover cream. Footer home link same.

### Quick View (QV)
`max-height: 92vh; max-height: 92svh;` — the `svh` fallback ensures the sheet stays within the visual viewport on iOS Safari when the URL bar is visible.

### Empty state
Text in `--cream`. "Send us a tip!" link in lime `#6ea900`.

---

## Known issues / to revisit
- **Anton font not loaded** — `.venue-name` and `.qv-name` use `font-family:'Anton'` but Anton is missing from the Google Fonts `<link>`. Falls back to sans-serif. Fix: add Anton back or switch to Bebas Neue.
- **CSS variables** — the new color palette is mostly hardcoded hex values. A future cleanup pass should define them as `:root` variables.
- **`manifest.json`** still has old `theme_color: "#3A5C28"` — should be updated to `#060f1e`.
- **`YOUREMAIL@example.com`** placeholder in empty state JS needs a real address.
- **Mobile card cutoff (partial)** — QV sheet `92svh` fix applied. A separate issue where card tops can be clipped on mobile at scroll position 0 has not been fully diagnosed.

## Design direction
- **Vibe:** Upscale bar. Elevated and welcoming. Navy/teal darkness as the "room," cream cards as the menu, crimson and lime as the energy. At night the header shifts to a dim bar atmosphere with neon glow on the POURS wordmark.
- **Key principle:** Clean but not sterile — the color system should do the work.

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via `python3 -m http.server 8080` → `http://localhost:8080`
- Append `?theme=night` / `?theme=morning` / `?theme=day` to test header themes without waiting
- Git: commit to `newvibe` → merge to `main` → Cloudflare auto-deploys (`violetbrownpsych/pours`)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — bump `CACHE` version string for breaking asset changes
