---
name: Obliv1a
description: An open-source house whose software is built to forget you — an identity made of erasure rather than armour.
colors:
  paper: "#FAFAF9"
  paper-2: "#F5F5F4"
  paper-3: "#E7E5E4"
  field: "#6D28D9"
  field-deep: "#5B21B6"
  void: "#2E1065"
  ink: "#1C1917"
  ink-mute: "#57534E"
  on-field-2: "#DDD6FE"
  on-void-2: "#C4B5FD"
  signal: "#E879F9"
  signal-ink: "#C026D3"
  rule-paper: "#D6D3D1"
  rule-field: "#8B5CF6"
  danger: "#BE123C"
  caution: "#A16207"
  live: "#15803D"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.02em"
  plate:
    fontFamily: "Bodoni Moda, ui-serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "0.005em"
  heading:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  none: "0"
  sm: "0"
  md: "0"
  lg: "0"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.void}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.field}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "13px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper}"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.field}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 9px"
  tag-solid:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 9px"
---

# Obliv1a Design System

## Overview

Obliv1a hosts open-source software for people who want out of Big Tech and have no
intention of becoming technical to get there. It keeps nothing: no logs, no training on
user conversations, no account trail. The identity is built on that absence.

The category default for a privacy brand is the vault — a shield, a lock, a keyhole,
armour drawn around something that is still being kept. This system refuses it. Nothing is
kept, so nothing needs guarding, and the visual argument is **erasure rather than
protection**. The mark is the numeral 1 from the name, holding its full cap height and
silhouette while seven horizontal slots cut through its stem, thickening downward as the
bands between them thin. The shape survives; the contents do not.

Everything else follows from that one drawing. The signature material (`.erase`) is the
same slot progression expressed as a CSS mask, applied to fields, headlines and panel
edges. Imagery is screened to a halftone and allowed to dissolve (`.grain`), the look of
something reproduced one generation too many times. Surfaces are square, unshadowed and
full-bleed, ruled rather than elevated, and a 10px VOID frame holds every viewport.

## Colors

Every value is a stock Tailwind palette colour. The scale step is the source of truth; the
role name is how product code refers to it, so no component hard-codes `violet-700`.

| Role | Tailwind | Hex | Use |
|---|---|---|---|
| `paper` | stone-50 | `#FAFAF9` | The document ground. Warm, not white. |
| `paper-2` / `paper-3` | stone-100 / stone-200 | `#F5F5F4` / `#E7E5E4` | Recessed and inset surfaces, disabled controls. |
| `field` | violet-700 | `#6D28D9` | **The brand field.** Whole regions, never an accent. |
| `field-deep` | violet-800 | `#5B21B6` | Pressed states and weight within a field. |
| `void` | violet-950 | `#2E1065` | The ground beneath, and the viewport frame. |
| `ink` / `ink-mute` | stone-900 / stone-600 | `#1C1917` / `#57534E` | Body and secondary text on paper. |
| `signal` | fuchsia-400 | `#E879F9` | The one warm note. **Dark grounds only.** |
| `signal-ink` | fuchsia-600 | `#C026D3` | The same signal where paper is the ground. |
| `danger` / `caution` / `live` | rose-700 / yellow-700 / green-700 | `#BE123C` / `#A16207` / `#15803D` | State. Always paired with a word and an icon. |

**Strategy: committed.** One saturated colour carries whole regions. A surface is FIELD,
VOID or PAPER end to end; half-tinted backgrounds and 5%-opacity brand washes are not part
of the system. A colour region should own 30–60% of a full page.

**Grounds are a contract, not a background colour.** `.on-paper`, `.on-field` and
`.on-void` each re-declare every variable the components read, so grounds nest correctly —
a PAPER panel inside a VOID section gets PAPER controls. Never style a component by
descendant selector from a ground.

**Measured pairings** (re-derived by `node brand/verify-contrast.mjs`, which exits non-zero
if a palette edit breaks them):

- body on PAPER 16.74:1 · secondary on PAPER 7.30:1 · brand type on PAPER 6.80:1
- body on FIELD 6.80:1 · secondary on FIELD 5.12:1
- body on VOID 14.59:1 · secondary on VOID 8.25:1 · signal on VOID 6.19:1

**Forbidden, by measurement:** signal on FIELD (2.89:1) and void on FIELD (2.14:1) never
set type. violet-300 on FIELD (3.85:1) is large text only.

## Typography

Three families, four voices. All four are self-hosted variable faces (latin subset, 231 KB
total) under the SIL Open Font License 1.1.

- **Display — Archivo 800, width 62–88.** Headlines, the wordmark, posters. The width axis
  does the work a second family usually does: 62 for the wordmark and poster voice, 75 for
  page titles, 88 for section headings.
- **Plate — Bodoni Moda 600, `opsz` 16.** Statements and covers. The Didone earns its place
  structurally, not atmospherically: its hairlines are an artefact of copperplate
  engraving, the same reproduction lineage the imagery comes from. **Pin the optical size**
  — left at its default the hairlines vanish on a saturated ground. Raise `opsz` only above
  roughly 72px.
- **Text — Archivo 400–700, width 100.** Body and UI. Measure capped at 68ch.
- **Label — JetBrains Mono 500–700, +0.14em, uppercase.** Labels, values, measurement and
  chrome. Chosen for its numeral 1: flagged and base-seriffed, so it cannot be read as an I
  or an l. A brand spelled with a numeral cannot afford an ambiguous one. Mono is never
  body copy pretending to be technical.

Tracking never goes below −0.04em. Headings take more space above than below.

## Layout

- **Measure.** Content sits on a 1360px maximum inside full-bleed colour regions; body copy
  is capped at 68ch.
- **Spacing.** A 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Tight inside a group,
  generous between groups.
- **The frame.** A 10px VOID border holds the viewport on every Obliv1a surface. It is the
  outermost mark of the system.
- **Full-bleed fields.** Colour regions run edge to edge and are interrupted by the frame,
  never by a margin. A FIELD panel floating in a PAPER page with air around it is a card,
  and there are no cards.
- **Breakpoints.** 640, 700, 760, 820, 900px. Below 900 the multi-column grids collapse to
  one column.
- **Containment.** Grid and flex children carry `min-width: 0`; wide tables live in an
  `overflow-x: auto` scroller and only get a `min-width` floor when they have three or more
  columns. Without both, a wide table sizes its track and the page scrolls sideways.

## Elevation & Depth

**The system has no shadows.** Elevation is a 1px rule, and each surface declares it once:
a border or a ground change, never both. A hairline under a soft shadow is the ghost card
and this system does not have one.

Rules step with the ground: `rule-paper` (stone-300) and `rule-paper-firm` (stone-900) on
paper; `rule-field` (violet-500) and `rule-field-firm` (violet-200) on the field;
`rule-void` (violet-800) and `rule-void-firm` (violet-500) on the void.

## Shapes

**Every corner is square.** Buttons, inputs, panels, images and the mark's plaque all sit
at radius 0, and both Tailwind configs set every radius token to 0 so it cannot drift back.
The single exception is a fully round pill on a toggle handle, where the shape is the
affordance.

**The erasure** is the system's signature form. Seven slots cut horizontally through a
solid, thickening downward (12·16·22·28·34·40·38 font units) while the surviving bands thin
(44·38·32·26·20·14·8). `.erase` applies the exact progression as a mask; `.erase-soft` runs
the same rhythm at half depth for surfaces carrying body copy. **One per surface** — two
erasures on one screen cancel each other and read as texture rather than argument.

**The grain** is the only texture: two offset dot grids at an 8px cell with 1.5px and 0.9px
radii, under a falloff mask. It comes from print reproduction. Grid overlays, noise
filters, gradient meshes and blurred blobs are not part of the brand.

## Components

- **Buttons.** Square, mono-labelled, uppercase at +0.14em, 13px/24px padding. The primary
  fills with the ground's own contrast colour: FIELD on paper, PAPER on field, SIGNAL on
  void. Ghost variants carry a 1px rule and invert on hover. `translateY(1px)` on active.
- **Inputs.** Square, 1px rule, transparent on coloured grounds. Focus is a 3px offset
  outline in the ground's signal colour, never a glow. Invalid state thickens the border to
  2px in `danger` and is always accompanied by a message naming the problem and the recovery.
- **Tags.** 1px rule in the current role colour; the solid variant inverts. State tags pair
  colour with an icon and a word.
- **Tables.** Ruled rows, mono uppercase headers, tabular numerals, first column mono.
- **Marks.** Marks are `<use>` references into one inline SVG sprite. CSS `mask-image` on an
  external SVG is not dependable across engines and cannot inherit `currentColor` at all, so
  the sprite is the only mark mechanism. `brand/marks/_build.py` is the source of truth for
  every mark's geometry; edit it, never the emitted SVG.
- **Motion.** One authored moment per surface, and in this system it is always the same one:
  something whole arriving and then losing its material. Easing is
  `cubic-bezier(.16,1,.3,1)`; controls 180ms, panels 240ms, the authored moment 600–700ms.
  Entrance motion is JS-gated so the resting, no-JS, print and pre-load state is the finished
  brand mark. Nothing loops, bounces or pulses.

## Do's and Don'ts

**Do**

- Commit a whole region to FIELD, VOID or PAPER, and let the frame interrupt it.
- Set the mark from the sprite and let it inherit `currentColor`.
- Reach for `.erase` exactly once per surface, where something is ending.
- Pair every state colour with a word and an icon.
- Run `brand/verify-contrast.mjs` after any palette edit.
- Name new products with a plain descriptive suffix (Obliv1a Mail, Obliv1a Notes) and
  inherit this system unchanged.

**Don't**

- Add a shadow, a gradient, a glow or a corner radius.
- Set type in `signal` on the FIELD, at any size.
- Rotate, mirror, outline, stretch or re-space the mark, or put it in a circle.
- Ship the erased mark below a 24px cap height; use the solid variant instead.
- Use full-colour photography, or a card grid of icon-plus-heading-plus-text as page
  structure.
- Draw a vault: no shields, locks, keyholes or padlocks. The argument is erasure.
- Recruit the reader into fear. The audience is anxious already.
