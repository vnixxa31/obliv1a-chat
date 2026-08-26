# Obliv1a — Identity System v1.0

Drop-in brand system. No build step, no CDN, no network calls: the typefaces,
the marks and the stylesheet are all in this folder.

```
brand/                    ← copy this into your repo root
  obliv1a.css               the system (16K)
  theme.css                 Tailwind v4 @theme
  tailwind.config.js        Tailwind v3 equivalent
  verify-contrast.mjs       CI guard — run after any palette edit
  fonts/                    4 self-hosted OFL variable faces + licences (232K)
  marks/                    10 SVGs + _build.py, their source of truth
DESIGN.md                 the design record — human and agent readable
PRODUCT.md                product truth, including what must not be invented
starter.html              smallest correct install; open it first
brand-book.html           the full 15-section identity system
ci/brand-check.yml        GitHub Actions workflow for the contrast guard
.impeccable/design.json   structured sidecar: ramps, components, rules
```

## Install

Copy `brand/` to your repo root, then pick one:

**Static HTML**

```html
<link rel="stylesheet" href="/brand/obliv1a.css">
<link rel="icon" href="/brand/marks/obliv1a-favicon.svg">
```

**Tailwind v4** — in your entry stylesheet:

```css
@import "tailwindcss";
@import "./brand/theme.css";     /* bg-field, text-on-void-2, font-plate, … */
@import "./brand/obliv1a.css";   /* @font-face, grounds, .erase, .grain */
```

**Tailwind v3** — merge `brand/tailwind.config.js` into your config, and still
import `obliv1a.css` for the pieces utilities cannot express.

Keep `obliv1a.css` even when you use Tailwind. It carries the ground contract,
`.erase`, `.grain` and the focus rules — none of which are utility-shaped.

## Marks

Inline `brand/marks/_sprite.svg` as the first element in `<body>`, then:

```html
<svg class="mkv mkv-mark"><use href="#o1-mark"/></svg>
```

Symbols: `#o1-wordmark`, `#o1-wordmark-small`, `#o1-mark`, `#o1-plaque`,
`#o1-lockup-h`, `#o1-lockup-v`.

The sprite must be inlined. A cross-file `<use href="file.svg#id">` cannot
inherit `currentColor`, and CSS `mask-image` on an external SVG is not
dependable across engines — both were tried and both failed. See `starter.html`
for the working shape.

For contexts that cannot take inline SVG — app icons, favicons, email, print —
use the standalone files in `brand/marks/` as `<img>`. Below a 24px cap height
the slots silt up: ship `obliv1a-mark-solid.svg` or `obliv1a-favicon.svg`.

## Grounds

Never restyle a control to suit its background. Commit the region to a ground
and let the components inherit:

```html
<section class="on-field" style="background:var(--g-bg);color:var(--g-fg)">
  <a class="btn">Primary</a>          <!-- inverts by itself -->
</section>
```

`.on-paper` (the default on `:root`), `.on-field`, `.on-void`. Each re-declares
the full variable set, so grounds nest correctly — a paper panel inside a void
section gets paper controls.

## Changing things

**Palette** — edit `brand/obliv1a.css`, mirror into `theme.css` and
`tailwind.config.js`, then:

```
node brand/verify-contrast.mjs
```

It re-derives all 16 documented ratios from the stylesheet and asserts the two
forbidden pairings still fail. Non-zero exit on drift. Copy `ci/brand-check.yml`
to `.github/workflows/` to enforce it on every push.

**Marks** — edit `brand/marks/_build.py` and re-run it. Never hand-edit an
emitted SVG; the next build overwrites it.

```
python3 -m venv .venv && .venv/bin/pip install fonttools brotli
.venv/bin/python brand/marks/_build.py
```

## Working with agents

`DESIGN.md` at your repo root is enough for Claude Code or any coding agent to
build inside this system rather than inventing its own. Impeccable reads it on
boot and treats it as the incumbent design language.

Ship `PRODUCT.md` alongside it. It records what is deliberately undecided —
pricing, licence identifier, model provenance, jurisdiction, retention schedule,
audits, user counts — so nothing downstream fabricates them.

## Licences

The three typefaces are SIL OFL 1.1 — redistributable, embeddable, and free for
commercial use. Full licence texts ship in `brand/fonts/`, alongside a summary in
`brand/fonts/LICENSES.md`. Keep them when you redistribute the font files; that
is the one condition the OFL actually imposes.

The marks are original work derived from Archivo outlines, which the OFL permits,
and are not themselves OFL-bound.
