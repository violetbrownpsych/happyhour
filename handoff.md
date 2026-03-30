# Pours — Handoff Notes
_Last updated: 2026-03-30_

## What this project is
Single-page happy hour directory for Minneapolis/St. Paul. All code lives in `index.html` (CSS + HTML + JS). Data is in `happyhours.csv`. No build step, no framework.

## Current branch
`newvibe` — visual redesign in progress. Not yet merged to main.

This session started by resetting `newvibe` back to commit `11f83c2` (Sat Mar 28 evening) and rebuilding the color system from scratch. The previous March 29 work is preserved on branch `newvibe-march29-backup`.

---

## Color system

### 5 base colors
| Base | Hex | Role |
|------|-----|------|
| Crimson | `#BF2338` | Primary accent — Twin Cities eyebrow, time pills, neighborhood text, card links |
| Maroon | `#6F263D` | Secondary warm accent — American, Italian card strips |
| Dark teal | `#1b3644` | Dark UI surfaces |
| Dark navy | `#082b52` | Darkest backgrounds |
| Lime | `#6ea900` | Energy accent — day pills, slider, live time, vibe filter, FAB |

### Variations and mappings

**Crimson (`#BF2338`)**
- `#E8556A` — lighter (Natural Wine, Mexican, Japanese card strips)
- `#9a1c2c` — darker border (time pill active border)
- `#8b1a27` — darkest (deal tag text color)

**Maroon (`#6F263D`)**
- Used directly for American, Italian card strips only

**Dark teal (`#1b3644`)**
- `#091620` — very dark (filter bar, summary bar, footer background)
- `#0d1d28` — dark (dropdown/elevated panels)
- `#1a9db5` — brightened (Cocktail Bar, French card strips)
- `#3ebfd8` — lightest (Hotel Bar, Mediterranean card strips)

**Dark navy (`#082b52`)**
- `#060f1e` — very dark (page background, POURS wordmark, time bar background)
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
- `#FAF6EF` (`--cream`) — header bg, card bg, footer/filter text at full opacity
- `#1A1410` (`--ink`) — dark brown text on cream card surfaces
- `#3A5C28` (`--green-lt`) — vibe tag `.tag-active` on cards (legacy — may align to lime in future)
- `#D4953A` (`--amber`) — still defined in `:root`, used by `applyHeaderTheme()` JS for header accent; not actively used in visible UI

---

## State of the redesign (what's done)

### Page background
Plain `#060f1e` (very dark navy-black). No image or texture.

### Header
Cream `#FAF6EF`. `POURS` wordmark in Bebas Neue (~7rem), color `#060f1e` (matches page bg). "TWIN CITIES" eyebrow in crimson `#BF2338`. Tagline: "Happy hours, hand picked."

### Time bar (below header)
Same `#060f1e` as page background — blends seamlessly. Live time shown in lime `#6ea900`.

### Filter bar + summary bar
Background `#091620` (dark teal). Dropdown panels `#0d1d28`. Labels (Day, Time, Neighborhood, Deals, Vibe), collapsible toggles (Neighborhood/Deals/Vibe), Hide/Change Filters, and mobile Filters button all use `--filter-dim` at `.62` opacity.

**Active pill colors:**
- Day / Today pills → lime `#6ea900`, darker border `#5a8800`
- All time pills (including Happening Now) → crimson `#BF2338`, darker border `#9a1c2c`
- Slider thumb + label → lime `#6ea900`
- Inactive pills → subtle raised shadow; active pills → colored raised shadow (both look like buttons)

**Collapsible filter panel active states:**
- Neighborhood → blue `#1a5fa0`
- Deals → crimson `#BF2338`
- Vibe → lime `#6ea900`

### Cards
Cream `#FAF6EF` background, no border, `border-radius:14px`. Drop shadow for depth. 5px color accent strip at top keyed to primary vibe (via `VIBE_COLORS` / `VIBE_PRIORITY`). Neighborhood text and Map/Website links in crimson `#BF2338` (DM Sans, tighter letter-spacing).

**Deal tags:** rectangular (`border-radius:3px`), red tint bg, dark red text `#8b1a27`
**Vibe tags:** pill-shaped (`border-radius:99px`), green tint bg, dark green text `#243d18`

### FAB (Map/List toggle)
Dark lime `#2e4800`, hover `#3a5800`.

### Footer
Background `#091620` (matches filter bar). Links in `--cream`, hover lime `#6ea900`.

### Empty state
Text in `--cream`. "Send us a tip!" link in lime `#6ea900`.

---

## Known issues / to revisit
- **Anton font not loaded** — `.venue-name` and `.qv-name` use `font-family:'Anton'` but Anton was removed from the Google Fonts `<link>`. Venue names fall back to sans-serif. Fix: either add Anton back to the font link, or switch to Bebas Neue.
- **CSS variables** — the new color palette is mostly hardcoded hex values scattered throughout the CSS. A future cleanup pass should define them as `:root` variables.
- **`manifest.json`** still has old `theme_color: "#3A5C28"` (green) — should be updated to `#060f1e`.
- **`YOUREMAIL@example.com`** placeholder in empty state JS needs a real address.
- **Teal card strips** (Cocktail Bar, French, Hotel Bar, Mediterranean) — may be removed in a future pass if the teal family feels out of place.
- **Header** — cream section hasn't been redesigned yet. No ring stains in this version.

## Design direction
- **Vibe:** Upscale bar. Elevated and welcoming. Navy/teal darkness as the "room," cream cards as the menu, crimson and lime as the energy.
- **Key principle:** Clean but not sterile — the color system should do the work.

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via `python3 -m http.server 8080` → `http://localhost:8080`
- Git: commit to `newvibe` → merge to `main` → Cloudflare auto-deploys (`violetbrownpsych/pours`)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — bump `CACHE` version string for breaking asset changes
