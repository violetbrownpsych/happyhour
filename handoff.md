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
`#1A1A1A` dark, all filter text uses `rgba(245,240,232,...)` variables. Untouched this session.

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
- **Header redesign:** Untouched — will work on this after card vibes are settled.
- **manifest.json** still has old `theme_color: "#3A5C28"` (green) — should be `#181512`.
- `YOUREMAIL@example.com` placeholder in the empty state needs a real address.
- `FALLBACK` array in JS not fully tested with sessions data structure.

## Design direction
- **Vibe:** Noir bar + bulletin board. Warm wood wall, bright colorful paper cards pinned to it.
- **Color pops:** Crimson (`--sienna: #BF2338`) is the accent. Card colors from `VIBE_COLORS` (bold, vibrant).
- **Key principle:** Disorder over cleanliness. Every element should feel physical and irregular.

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via browser
- Git: feature branch → merge to main → Cloudflare auto-deploys (`violetbrownpsych/pours`, main branch)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — bump `CACHE` version string for breaking asset changes
