# Pours — Handoff Notes
_Last updated: 2026-03-29_

## What this project is
Single-page happy hour directory for Minneapolis/St. Paul. All code lives in `index.html` (CSS + HTML + JS). Data is in `happyhours.csv`. No build step, no framework.

## Current branch
`newvibe` — visual redesign in progress. **Not yet merged to main.** Uncommitted changes in `index.html`.

## State of the redesign (what's done)

### Body background
Dark atmospheric distressed wood — multi-layer CSS gradients (warm dark browns `#150f05`), repeating horizontal grain lines, vignette (darker edges), SVG feTurbulence grain overlay at 0.42 opacity. Body background `var(--bg)` no longer used — background is set directly on `body`.

### Filter bar
`#1A1A1A` dark, all filter text uses `rgba(245,240,232,...)` variables. Untouched this session.

### Header
Plain cream `#FAF6EF`, no pattern. `POURS` wordmark in Bebas Neue (huge). "TWIN CITIES" eyebrow in crimson. Tagline: "Less searching, more socializing." **Untouched this session — to be worked on later.**

### Card font
**Martian Mono** 400/700. Replaced Courier Prime (too wide). Applies to: `.venue-name`, `.qv-name` (700), `.hours-text`, `.days-text`, `.deal-item`, `.qv-hours`, `.qv-days`, `.qv-deal-item`. Martian Mono is condensed and feels typewriter-ish without being too ornate.

### Card colors (VIBE_COLORS)
Vibrant, Pompey-style palette: golden `#E8C038`, bright green `#4AAA48`, coral `#E87060`, cream `#F5EDDA`, teal `#28A090`, rose `#D86070`, purple `#9070C8`, etc. Inline style on `.card-bg` div (see card structure below).

### Card structure (current implementation)
Cards use a two-element layered approach to isolate the torn-edge SVG filter from the text:

```
.card  (position:relative, isolation:isolate, no background, no filter)
  .card-bg  (position:absolute, inset:0, z-index:-1, background-color:COLOR from JS, filter:torn+drop-shadow)
    .card-bg::before  (stacked paper 1, z-index:-1, background-color:inherit, brightness .74, rotate -5.2deg)
    .card-bg::after   (stacked paper 2, z-index:-2, background-color:inherit, brightness .64, rotate +4.1deg)
  .card-pin  (position:absolute, top:-14px, metallic radial-gradient circle, z-index:10)
  .card-body  (text content — NO filter applied, renders crisp)
  .card-footer  (text content — NO filter applied)
```

Key: the `filter: var(--torn-fn) drop-shadow(...)` lives on `.card-bg`, NOT `.card`. Text is untouched by the SVG displacement. The torn filter ID is set as a CSS custom property `--torn-fn` on `.card` using 5 nth-child(5n+N) variants (seeds 3, 9, 17, 24, 31). Displacement scale 6–9.

Card grain texture: SVG feTurbulence `baseFrequency='0.75 0.02'` (horizontal fibers) baked as data-URI background-image with `background-blend-mode: multiply`. Two crease lines via a `173deg` linear-gradient with hard stops at ~31% and ~63%.

Heavy grime inset shadow: `inset 0 0 0 3px rgba(60,25,4,.58)` (hard dark ring) + two wider spread layers.

---

## 🐛 Three known bugs to fix in next session

### Bug 1: Stacked paper color order is inverted
**What you see:** The brightest, most saturated version of the card color appears to be peeking out from BEHIND, while the front card face looks more muted/desaturated.
**Expected:** Front card (`.card-bg` itself) = full vibrant color. Papers behind = progressively darker/more desaturated.
**Likely cause:** `background-blend-mode: multiply` on `.card-bg`'s grain texture is desaturating the front card significantly, while the `::before`/`::after` pseudo-elements use `background-color: inherit` with NO grain texture — so the raw unmodified color actually appears brighter on the back papers than on the front. Two possible fixes:
  - Option A: Change `background-blend-mode` from `multiply` to `overlay` and reduce grain opacity (was doing this in an earlier version — `overlay` lightens some areas and darkens others but preserves more of the original saturation)
  - Option B: Add the same grain texture/blend to `::before`/`::after` so the three paper layers look equally aged. Then the brightness filter (.74 and .64) on the back papers will correctly make them darker than the front.

### Bug 2: Weird outline/ring on colored cards
**What you see:** Some cards have a visible rectangular or semi-rectangular outline artifact, most visible on the vividly-colored cards.
**Likely cause:** The `inset 0 0 0 3px rgba(60,25,4,.58)` hard-edge inset shadow is rendering as a visible dark rectangular ring before the torn displacement warps it. Since the inset shadow is applied before the filter, and the filter region may not displace the very corners enough, a rectangular artifact remains. **Fix:** Remove the hard `0 0 0 3px` inset layer; keep only the soft spread inset layers (`inset 0 0 20px ...` and `inset 0 0 60px ...`). Or: apply the grime via an absolutely-positioned inner `::before` element instead of `box-shadow` on `.card-bg`.

### Bug 3: One stacked paper renders as a solid grey/shadow
**What you see:** One of the two background papers (most likely `::after`) appears as a flat grey or near-black shape rather than a desaturated version of the card color.
**Likely cause:** `background-color: inherit` on `.card-bg::before`/`::after` may not be reliably inheriting the inline-style `background-color` from `.card-bg` in all browsers when a `filter` is applied to the parent. The filter creates a compositing group, and some browsers may resolve `inherit` to `transparent` or a UA default inside a filter context. **Fix:** Instead of relying on `background-color: inherit`, set the color explicitly in JS. Change the card HTML generation so the `.card-bg` element gets a `data-color` attribute, then use JS to also set `style` on the pseudo-elements — OR, more practically, replace the pseudo-elements with actual sibling divs (`.card-stack-1`, `.card-stack-2`) injected in JS with explicit `background-color` set.

---

## Other known issues / to revisit
- **Header redesign:** Untouched — will work on this after card vibes are settled.
- **manifest.json** still has old `theme_color: "#3A5C28"` (green) — should be `#181512`.
- `YOUREMAIL@example.com` placeholder in the empty state card needs a real address.
- `FALLBACK` array in JS not fully tested with sessions data structure.
- **Martian Mono width:** User wants to verify days-separated-by-dots fit comfortably next to the time on cards. Open question.

## Design direction summary
- **Vibe:** Noir bar + Pompey bulletin board. Dark atmospheric wood wall, bright colorful paper cards pinned to it.
- **Color pops:** Crimson/lipstick (`--sienna: #BF2338`) is the accent. Card colors from VIBE_COLORS (bold, vibrant Pompey-style).
- **Typography:** `POURS` = Bebas Neue. Card content = Martian Mono (typewriter, condensed). UI chrome = DM Sans.
- **NOT** a full dark mode — header is light cream.
- **Key principle:** Disorder over cleanliness. Every element should look irregular and processed — not a standard UI widget.

## Workflow
- Edit `index.html` (and `happyhours.csv` for venue data)
- Test locally via browser at `localhost` or just open the file
- Git: feature branch → merge to main → Cloudflare auto-deploys from GitHub (`violetbrownpsych/pours`, main branch)
- After deploy: purge Cloudflare cache manually
- Service worker (`sw.js`) uses stale-while-revalidate — users get cached version instantly, update in background

## CSV format
Pipe-delimited multi-value fields. Key columns: `name, neighborhood, city, days, startTime, endTime, deals, dealTags, vibe, website, mapsUrl, accentColor, lat, lng, verified`
- `startTime`/`endTime`: 24hr integers (1600 = 4:00 PM)
- Multiple rows with same `name` = multiple sessions for one venue
- Only first row needs neighborhood/city/vibe/website etc.; continuation rows can leave those blank
