# Obliv1a Chat — landing page

The marketing site for **Obliv1a Chat**, built on the Obliv1a identity system. Astro 7 with
React 19 islands, Tailwind v4 and shadcn/ui — currently shipping zero JavaScript, because
nothing on the page needs any.

The design system lives in [`obliv1a-brand/`](obliv1a-brand/) and is the authority for every
visual decision. Read [`obliv1a-brand/DESIGN.md`](obliv1a-brand/DESIGN.md) first;
[`brand-book.html`](obliv1a-brand/brand-book.html) is the long form and
[`starter.html`](obliv1a-brand/starter.html) is the same page this repo rebuilds in Astro.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # → dist/
pnpm preview      # serve the build
pnpm typecheck    # astro check
pnpm lint         # eslint (ts/tsx only)
pnpm format       # prettier

node obliv1a-brand/brand/verify-contrast.mjs    # required after any palette edit
```

## How the brand is wired

`src/styles/global.css` imports both brand files straight out of `obliv1a-brand/` — nothing is
copied, so the palette this app renders is the same file the contrast guard audits.
`brand/theme.css` supplies the Tailwind theme; `brand/obliv1a.css` is imported into the `base`
layer and carries the parts that are not utility-shaped: `@font-face`, the ground contract, the
type voices, `.erase`, `.grain`, focus.

**Grounds are a contract.** Commit a region to `.on-paper`, `.on-field` or `.on-void` and the
controls inside invert by themselves — each ground re-declares every variable they read. That is
what `<Section ground="field">` does, and it is why no component here is ever restyled to suit
its background.

```astro
<Section ground="void">
  <h2 class="t-h2 erase">This heading is being erased.</h2>
</Section>
```

## Adding a component

```bash
pnpm dlx shadcn@latest add <component>
```

Then restyle it before use: stock semantic tokens out, ground variables in; radius 0; the label
voice on anything that carries a label. `src/components/ui/button.tsx` is the worked example.
