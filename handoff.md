# Pours — Handoff Notes
_Last updated: 2026-03-29_

## What this project is
Single-page happy hour directory for Minneapolis/St. Paul. All code lives in `index.html` (CSS + HTML + JS). Data is in `happyhours.csv`. No build step, no framework.

## Current branch
`newvibe` — visual redesign in progress. Not yet merged to main.

## State of the redesign (what's done)

### Body background
Real wood photo (`wood-background-seamless.jpg`) tiled at 1423px wide, scrolls with page. Seamless version was created by flipping the original (`wood-background.png`) vertically and stacking it to eliminate horizontal tile seams. CSS overlay layers on top:
- `linear-gradient(to right, rgba(44,24,8,.80) ...)` — fades left/right edges to hide vertical seams
- `radial-gradient(...)` — vignette, darkens edges
- `background-color: #2C1808` — dark mahogany fallback

### Filter bar
Warmed to `--bg-filter:#1A100A` (dark mahogany), `--bg-elevated:#221408`, amber-tinted borders `rgba(212,149,58,.16)`. Pills use Archivo Narrow font with slight letter-spacing. Labels (Day, Time, Neighborhood, Deals, Vibe) are Archivo Narrow at `.68` opacity — matches the "Change Filters" / summary bar text weight. Collapsible toggles (Neighborhood/Deals/Vibe) also bumped to `.68` opacity.

**Active pill colors:**
- Day / Today pills → amber (`--amber:#D4953A`), ink text
- Time / Now / Pick a time → merlot (`--merlot:#7A2D3E`), cream text
- Slider thumb + label → amber (intentionally matches day, not time)

**Filter bar bottom border:** amber-tinted (`var(--filter-border)`), not merlot.

**Summary bar dim text** (Change Filters, time, result count, Hide Filters button) → `rgba(245,240,232,.68)` for readability on mahogany.

### Header
Plain cream `#FAF6EF`. `POURS` wordmark in Bebas Neue (huge, ~7rem). "TWIN CITIES" eyebrow in crimson. Tagline: "Less searching, more socializing." **To be worked on in a future session.**

### Typography (current)
- **Bebas Neue** — `POURS` header wordmark, card `.venue-name`, QV `.qv-name`
- **Special Elite** — card `.deal-item`, QV `.qv-deal-item` (typewriter aesthetic)
- **Archivo Narrow** — `.status-badge`, `.neighborhood`, `.hours-text`, `.days-text`, `.card-link`, `.card-verified`, `.tag-deal`, `.tag-vibe`, `.qv-neighborhood`, `.qv-hours`, `.qv-days`
- **DM Sans** — UI chrome, filter bar, pills, headings
- **Playfair Display** — results heading (`#results-heading`)

### Card structure (current implementation)
Three actual sibling divs for the stacked paper effect (not pseudo-elements — pseudo-elements can't reliably inherit inline `background-color` inside a filter context):

```
.card  (position:relative, isolation:isolate, no background, no filter)
  .card-bg      (position:absolute, inset:2px 0 0 0, z-index:-1, background-color:COLOR, filter:torn+drop-shadow)
  .card-stack-1 (position:absolute, inset:0, z-index:-2, background-color:same COLOR, filter:brightness(.95)+torn+drop-shadow)
  .card-stack-2 (position:absolute, inset:0, z-index:-3, background-color:same COLOR, filter:brightness(.92)+torn+drop-shadow)
  <img class="card-pin">  (pin-image.png, ~22px wide, top:-3px, z-index:10)
  .card-body    (text content — no filter)
  .card-footer  (text content — no filter)
```

**Card colors:** JS computes `cardColor = getAccentColor(v)` (from `VIBE_COLORS` map or venue's `accentColor`). All three layers use the same color — `darkenColor(cardColor, 1.0)` for both stacks. Visual distinction comes from `brightness` filters and shadows only.

**Stack transforms:**
- `.card-stack-1`: `rotate(-4deg) translate(-12px, 7px)` — CCW, left edge peeks out to the left
- `.card-stack-2`: `rotate(5deg) translate(-5px, 3px)` — CW, top-left corner peeks above the top edge

**Torn edge:** 5 SVG `feTurbulence` + `feDisplacementMap` filters (seeds 3, 9, 17, 24, 31, scale 6–9), cycled via `nth-child(5n+N)` as `--torn-fn` CSS variable on `.card`. Filter lives on `.card-bg` (and stacks), NOT on `.card` — this keeps text crisp.

**clip-path on `.card-bg`:** `inset(-8% -50% -50% -50%)` — allows the drop-shadow to bleed slightly above the card top (prevents a hard horizontal shadow line across card rows).

### Push pin
`<img class="card-pin" src="pin-image.png">` — brass thumbtack photo with transparent background, 22px wide, positioned at `top:-3px`. Uses `filter: drop-shadow(...)` so shadow follows the pin shape, not the bounding box.

### Card background texture
No SVG grain on `.card-bg` (removed — was causing visible vertical striping due to anisotropic `baseFrequency`). The card surface is a solid color with:
- Two radial gradients (subtle corner shadows)
- One linear-gradient crease (fold line at ~45°)
- Inset box-shadows for edge burn

`.card-stack-1` and `.card-stack-2` retain their grain texture (URL-encoded SVG data URI, same `baseFrequency='0.75 0.02'`) since it's subtle at reduced brightness.

---

## Known issues / to revisit
- **Header redesign:** Still pending — the cream header with POURS wordmark works but hasn't been touched. The wine ring stain is already in place. Next step: consider darkening the header to match the filter bar mahogany, or leaning into the cream-as-menu-card concept.
- **manifest.json** still has old `theme_color: "#3A5C28"` (green) — should be `#181512`.
- `YOUREMAIL@example.com` placeholder in the empty state needs a real address.
- `FALLBACK` array in JS not fully tested with sessions data structure.

## Design direction
- **Vibe:** Hi-fi bar — martinis, wine, beer. Elevated and welcoming, not dive-bar. Casual but well done. The wood should feel like a nice upscale bar surface, not a roadhouse.
- **Color pops:** Merlot (`--merlot:#7A2D3E`) for time/interaction accents. Amber (`--amber:#D4953A`) for day/warm accents. Crimson (`--sienna:#BF2338`) still in palette but stepped back from primary UI role.
- **Key principle:** Disorder over cleanliness. Every element should feel physical and irregular.
- **Decorative details:** Ring stains as found-object texture — a beer/amber ring on the wood wall (behind cards, top-left), a wine/merlot oval ring in the header cream surface (behind POURS wordmark, under the P).

## Ring stain details
Two SVG ring stains, both using `#ring-warp` filter (turbulence displacement, no blur) defined in the global defs SVG at top of body.

**Wall ring** (`div.ring-stain` inside `div#content-area`):
- `position:absolute; z-index:-1; top:-30px; left:-76px` (content-area has `isolation:isolate`)
- 300×300px SVG, circle r=128, amber stroke at 24% opacity, faint amber fill at 5%
- Left edge goes off-screen; top portion visible above first card row; bottom covered by cards

**Header wine ring** (`div.wine-ring-header` inside `<header>`, before `.header-inner`):
- `position:absolute; z-index:1; bottom:calc(.6rem + 32px); left:50%; transform:translateX(-147%)`
- 120×74px SVG, ellipse rx=46 ry=25 (1.84:1 ratio), merlot stroke at 22% opacity
- Sits behind POURS wordmark (header-inner is z-index:2), visually under the P as if the logo left the stain

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via browser
- Git: feature branch → merge to main → Cloudflare auto-deploys (`violetbrownpsych/pours`, main branch)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — bump `CACHE` version string for breaking asset changes
