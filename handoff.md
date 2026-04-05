# Pours — Handoff Notes
_Last updated: 2026-04-05_

## What this project is
Single-page happy hour directory for Minneapolis/St. Paul. All code lives in `index.html` (CSS + HTML + JS). Data is in `happyhours.csv`. No build step, no framework.

## Current branch
`main` — redesign complete and merged.

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

Three time-of-day states, all driven by `applyHeaderTheme()` (runs on load and every 60s). Transitions are smooth lerps over 1-hour windows. Test with URL params: `?theme=morning`, `?theme=day`, `?theme=night`.

**Standard / day (7am–noon, noon–7pm):** Cream `#FAF6EF` background. `POURS` in dark navy `#060f1e`. "TWIN CITIES" eyebrow in crimson `#BF2338`. Tagline in dim dark brown. No glow.

**Morning (7am–11am, transitioning in 6–7am, out 11am–noon):** Cream `#FAF6EF` background (same as day). `POURS` in dark navy `#060f1e`. Blue-dawn text-shadow glow builds behind the letters — ice white tight core, cornflower mid bloom, deeper sky blue outer wash, wide pre-dawn haze. "TWIN CITIES" gains a soft blue glow. Feels like early light through a window.

**Night (fully at 8pm, transitioning in 7–8pm, out 6–7am):** Header background lerps from cream → very dark warm charcoal `#1a0d0a`. `POURS` text lerps dark navy → cream. Neon text-shadow: warm orange-white tight core, crimson mid bloom, crimson outer halo. "TWIN CITIES" gains a crimson glow. Tagline lerps to stay readable on dark bg.

**Night → Morning transition (6–7am):** Both crimson (fading) and blue (rising) shadows apply simultaneously — briefly overlaps as a warm purple-violet, like a real sunrise color shift.

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
- **Mobile card cutoff (partial)** — QV sheet `92svh` fix applied. A separate issue where card tops can be clipped on mobile at scroll position 0 has not been fully diagnosed.

## Bug fixes (2026-04-01)
- **Time filter boundary bug** — `overlaps()` used inclusive `<=`/`>=`, so a session starting exactly at 8 PM matched the Happy Hour filter (`[1400, 2000]`). Fixed to strict `<`/`>` so boundaries are exclusive. Happy Hour is now cleanly `[1400, 2000)`, Lunch `[1100, 1400)`, Morning `[700, 1100)`.
- **Morning window stale bound** — was `overlaps(s,e,700,1059)` (a workaround for the old inclusive logic). Updated to `1100` to match where Lunch starts.
- **Email links** — footer and empty-state `mailto:` links set to `poursapp@gmail.com`. Cloudflare Email Obfuscation turned off in dashboard (was breaking on iOS Safari with Advanced Privacy Protections). Cloudflare decode script removed from HTML.
- **Mobile header padding** — reduced slightly: top `1.8rem → 1.2rem`, bottom `1.5rem → 1rem`.

## Changes (2026-04-05)

### CSS variable cleanup + color consistency pass
All palette colors that were hardcoded in the stylesheet have been moved to `:root` variables. New variables added:
- `--lime: #6ea900` — live time, day/today pills, vibe active pill, slider, verified text, FAB, footer links
- `--lime-dk: #5a8800` — day/today pill active border, vibe active border
- `--lime-dkst: #2e4800` — FAB background
- `--lime-hover: #3a5a00` — FAB hover background
- `--lime-tint-bg: rgba(110,169,0,.1)` — verified badge background (QV)
- `--lime-tint-border: rgba(110,169,0,.25)` — verified badge border (QV)
- `--crimson-dk: #9a1c2c` — time pill active border
- `--crimson-dkst: #8b1a27` — deal tag text, card link hover
- `--navy-mid: #1a5fa0` — neighborhood pill active

Also: `header { background }` now uses `var(--cream)` and `header h1 { color }` now uses `var(--bg)`. No visual change.

Removed 10 unused `:root` variables that were legacy from earlier design iterations: `--green-lt`, `--amber`, `--berry`, `--blush`, `--card`, `--header-accent`, `--timebar-bg`, `--deal-tag-bg/border/text`, `--vibe-tag-bg/border/text`.

### Verified badge + vibe tag color unification
- `.popup-verified` (map popup) and `.qv-verified` (Quick View sheet) now use lime to match `.card-verified`. QV badge background/border use new `--lime-tint-bg`/`--lime-tint-border` variables.
- Active vibe tags (`.tag-vibe.tag-active`) now use `--lime`/`--lime-dk` instead of the old forest green `--green-lt`, consistent with day pills and other lime UI elements.

## Changes (2026-04-03)

### Mobile scroll-collapse behavior (scroll_fix branch → main)
The filter bar on mobile now scrolls off the top naturally (no sticky) — entirely compositor-driven, no JS scroll-linking, so no jitter. Key implementation details:

- `#filters-wrap` is `position: relative` on mobile (not sticky).
- An `IntersectionObserver` watches the filter bar. When it fully exits above the viewport, `scroll-collapsed` is added (`visibility: hidden` — holds layout space, no shift), then `display: none` + synchronous `scrollBy(0, -h)` (with `scroll-behavior: auto` temporarily applied) removes the height from the flow without a visible jump.
- The summary bar slides in via `slideSummaryIn()` simultaneously — `translateY(-100%) → translateY(0)` with a spring easing.
- The summary bar is sticky at top and stays visible until tapped. Tapping calls `window.scrollTo({top:0})` and restores the filter bar.
- "Hide Filters" button on mobile: sets `display: none` immediately (no scroll compensation needed — user is at top) then slides summary bar in.
- Desktop scroll behavior unchanged — scroll-linked `translateY` animation with spacer, as before.

### Mobile map mode header (restore-header branch → main)
- Header was previously hidden in mobile map mode (`display: none`). Now restored with compact padding (`padding-top: 1.1rem; padding-bottom: .9rem`) via `body.map-mode-active .header-inner` override — narrower than list mode but still present.
- Time bar remains hidden in mobile map mode.

## Design direction
- **Vibe:** Upscale bar. Elevated and welcoming. Navy/teal darkness as the "room," cream cards as the menu, crimson and lime as the energy. At night the header shifts to a dim bar atmosphere with neon glow on the POURS wordmark.
- **Key principle:** Clean but not sterile — the color system should do the work.

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via `python3 -m http.server 8080` → `http://localhost:8080`
- Append `?theme=night` / `?theme=morning` / `?theme=day` to test header themes without waiting
- Git: commit and push to `main` → Cloudflare auto-deploys (`violetbrownpsych/pours`)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — bump `CACHE` version string for breaking asset changes
