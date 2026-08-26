#!/usr/bin/env python3
"""
Obliv1a identity geometry — the single source of truth for every mark in this
directory.  Re-run after any edit:

    <venv>/bin/python brand/marks/_build.py

LETTERFORMS  Archivo (SIL OFL 1.1), instanced at wdth 62 / wght 800.
THE ERASURE  The numeral 1 keeps Archivo's full cap height and silhouette — it
             must read as a 1 before it reads as anything else — and loses its
             MATERIAL instead: seven horizontal slots cut through the stem,
             thickening downward while the bands between them thin, so the
             glyph is solid at the top and nearly gone at the baseline.
             The same drawing is the standalone mark. One glyph, two crops.
SMALL SIZE   Below 24px cap the slots silt up. Ship the SOLID variant.
"""
import os
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

D    = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(D, '..', 'fonts', 'archivo-var.woff2')
FIELD, PAPER = '#6D28D9', '#FAFAF9'

WDTH, WGHT, CAP_OUT, TEXT = 62, 800, 48.0, 'OBLIV1A'
TRACK = -14          # font units between glyphs

# Slots to remove, in font units, baseline 0 -> cap 688. Thicken downward.
SLOTS = [(360, 372), (300, 316), (240, 262), (180, 208),
         (120, 154), (60, 100), (8, 46)]

font = instancer.instantiateVariableFont(TTFont(SRC), {'wdth': WDTH, 'wght': WGHT})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font['hmtx']
CAP = font['OS/2'].sCapHeight
K   = CAP_OUT / CAP

def ink(g):
    bp = BoundsPen(gs); gs[g].draw(bp); return bp.bounds

def path(g, dx=0.0):
    pen = SVGPathPen(gs, ntos=lambda v: f'{v:.2f}')
    gs[g].draw(TransformPen(pen, Transform(K, 0, 0, -K, dx, CAP_OUT)))
    return pen.getCommands()

ONE  = cmap[ord('1')]
OX0, _, OX1, OY1 = ink(ONE)

def slots(dx=0.0):
    """Erasure slots as (x, y, w, h) design-unit rects spanning the 1's ink."""
    x = dx + OX0 * K
    w = (OX1 - OX0) * K
    return [(x, CAP_OUT - y1 * K, w, (y1 - y0) * K) for y0, y1 in SLOTS]

def mask_def(uid, dx=0.0):
    x = dx + OX0 * K - 4
    w = (OX1 - OX0) * K + 8
    cut = ''.join(f'<rect x="{a:.2f}" y="{b:.2f}" width="{c:.2f}" height="{d:.2f}"/>'
                  for a, b, c, d in slots(dx))
    return (f'<mask id="{uid}" maskUnits="userSpaceOnUse" x="{x:.2f}" y="-8" '
            f'width="{w:.2f}" height="{CAP_OUT + 16:.2f}">'
            f'<rect fill="#fff" x="{x:.2f}" y="-8" width="{w:.2f}" '
            f'height="{CAP_OUT + 16:.2f}"/>'
            f'<g fill="#000">{cut}</g></mask>')

def svg(w, h, body, defs=''):
    d = f'  <defs>{defs}</defs>\n' if defs else ''
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'fill="currentColor">\n{d}{body}\n</svg>\n')

def wordmark_svg(erased=True, uid='er'):
    x, lines, defs = 0.0, [], ''
    for ch in TEXT:
        g   = cmap[ord(ch)]
        adv = hmtx[g][0]
        if ch == '1' and erased:
            defs = mask_def(uid, x)
            lines.append(f'  <path d="{path(g, x)}" mask="url(#{uid})"/>')
        else:
            lines.append(f'  <path d="{path(g, x)}"/>')
        x += (adv + TRACK) * K
    total = x - TRACK * K
    return svg(total, CAP_OUT, '\n'.join(lines), defs), total

def mark_svg(box=64, cap=44, uid='mk', bg=None, fg=None, border=0, erased=True):
    sc = cap / CAP_OUT
    w  = (OX1 - OX0) * K * sc
    ox = (box - w) / 2 - OX0 * K * sc
    oy = (box - cap) / 2
    defs = mask_def(uid) if erased else ''
    g = f'<path d="{path(ONE)}"' + (f' mask="url(#{uid})"/>' if erased else '/>')
    out = ''
    if bg:
        out += f'  <rect width="{box}" height="{box}" fill="{bg}"/>\n'
    if border:
        hb = border / 2
        out += (f'  <rect x="{hb}" y="{hb}" width="{box-border}" height="{box-border}" '
                f'stroke="currentColor" stroke-width="{border}" fill="none"/>\n')
    fill = f' fill="{fg}"' if fg else ''
    out += f'  <g transform="translate({ox:.2f} {oy:.2f}) scale({sc:.4f})"{fill}>{g}</g>'
    return svg(box, box, out, defs)

def _inner(s):
    return s.split('<svg')[1].split('>', 1)[1].rsplit('</svg>', 1)[0]

def lockup_h():
    wm, total = wordmark_svg(True, 'lh')
    plaque, gap = 48, 20
    mk = mark_svg(plaque, 27, 'lhm', border=3.5)
    W  = plaque + gap + total
    return svg(W, CAP_OUT, f'{_inner(mk)}\n  <g transform="translate({plaque+gap} 0)">{_inner(wm)}</g>')

def lockup_v():
    wm, total = wordmark_svg(True, 'lv')
    plaque, gap = 64, 18
    mk = mark_svg(plaque, 34, 'lvm', border=5)
    W  = max(plaque, total)
    return svg(W, plaque + gap + CAP_OUT,
        f'  <g transform="translate({(W-plaque)/2:.2f} 0)">{_inner(mk)}</g>\n'
        f'  <g transform="translate({(W-total)/2:.2f} {plaque+gap})">{_inner(wm)}</g>')

def w(name, content):
    open(os.path.join(D, name), 'w').write(content)
    print(f'  {name:34} {len(content):>6}')

# --------------------------------------------------------------- appendix
def construction_svg():
    """Annotated construction drawing of the erasure, for the identity spec."""
    W, Hh, cap = 300.0, 120.0, 84.0
    sc = cap / CAP_OUT
    gw = (OX1 - OX0) * K * sc
    ox = 92 - OX0 * K * sc
    oy = (Hh - cap) / 2
    L, dims = [], []
    for i, (x, y, w, h) in enumerate(slots()):
        X, Y = ox + x * sc, oy + y * sc
        Wd, Ht = w * sc, h * sc
        dims.append(f'<rect x="{X:.2f}" y="{Y:.2f}" width="{Wd:.2f}" height="{Ht:.2f}" '
                    f'fill="#E879F9" fill-opacity=".28"/>')
        dims.append(f'<line x1="{X+Wd+6:.2f}" y1="{Y:.2f}" x2="{X+Wd+30:.2f}" y2="{Y:.2f}" '
                    f'stroke="#C4B5FD" stroke-width=".6"/>')
        dims.append(f'<line x1="{X+Wd+6:.2f}" y1="{Y+Ht:.2f}" x2="{X+Wd+30:.2f}" y2="{Y+Ht:.2f}" '
                    f'stroke="#C4B5FD" stroke-width=".6"/>')
        dims.append(f'<line x1="{X+Wd+22:.2f}" y1="{Y:.2f}" x2="{X+Wd+22:.2f}" y2="{Y+Ht:.2f}" '
                    f'stroke="#E879F9" stroke-width="1"/>')
        dims.append(f'<text x="{X+Wd+34:.2f}" y="{Y+Ht/2+2.6:.2f}" fill="#C4B5FD" '
                    f'font-family="ui-monospace,monospace" font-size="6.5">'
                    f'{SLOTS[i][1]-SLOTS[i][0]}</text>')
    baseline = oy + cap
    guides = (f'<line x1="30" y1="{oy:.2f}" x2="{W-16:.2f}" y2="{oy:.2f}" stroke="#8B5CF6" '
              f'stroke-width=".6" stroke-dasharray="3 3"/>'
              f'<line x1="30" y1="{baseline:.2f}" x2="{W-16:.2f}" y2="{baseline:.2f}" '
              f'stroke="#8B5CF6" stroke-width=".6" stroke-dasharray="3 3"/>'
              f'<text x="30" y="{oy-5:.2f}" fill="#8B5CF6" font-family="ui-monospace,monospace" '
              f'font-size="6.5">CAP</text>'
              f'<text x="30" y="{baseline+11:.2f}" fill="#8B5CF6" '
              f'font-family="ui-monospace,monospace" font-size="6.5">BASELINE</text>')
    glyph = (f'<g transform="translate({ox:.2f} {oy:.2f}) scale({sc:.4f})" fill="#FAFAF9">'
             f'<path d="{path(ONE)}" mask="url(#cx)"/></g>')
    return svg(W, Hh, f'  {guides}\n  {glyph}\n  {"".join(dims)}', mask_def('cx'))

def sprite():
    """One inline <symbol> per mark. CSS mask-image on an external SVG is not
    dependable across engines and cannot inherit currentColor at all, so every
    in-page mark is a <use> of this sprite instead."""
    wm, wtot = wordmark_svg(True,  'sp-wm')
    ws, _    = wordmark_svg(False, 'sp-ws')
    lh, lv   = lockup_h(), lockup_v()
    mk       = mark_svg(64, 46, 'sp-mk')
    pl       = mark_svg(64, 32, 'sp-pl', border=5)

    import re as _re

    def split(src):
        """viewBox + everything between the root <svg ...> and </svg>.
        Nested <defs> stay where they are: defs are legal anywhere in SVG and
        mask ids resolve document-wide, so a symbol may carry its own."""
        vb   = _re.search(r'viewBox="([^"]+)"', src).group(1)
        body = src[src.index('>') + 1: src.rindex('</svg>')]
        return vb, body

    out = []
    for sid, src in [('o1-wordmark', wm), ('o1-wordmark-small', ws),
                     ('o1-lockup-h', lh), ('o1-lockup-v', lv),
                     ('o1-mark', mk), ('o1-plaque', pl)]:
        vb, body = split(src)
        out.append(f'  <symbol id="{sid}" viewBox="{vb}" fill="currentColor">'
                   f'{body}</symbol>')
    return ('<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" '
            'style="position:absolute" aria-hidden="true" focusable="false">\n'
            + '\n'.join(out) + '\n</svg>\n')

if __name__ == '__main__':
    print('Obliv1a marks ->')
    wm, total = wordmark_svg(True,  'erase'); w('obliv1a-wordmark.svg', wm)
    ws, _     = wordmark_svg(False, 'solid'); w('obliv1a-wordmark-small.svg', ws)
    w('obliv1a-mark.svg',              mark_svg(64, 46, 'm1'))
    w('obliv1a-mark-solid.svg',        mark_svg(64, 36, 'm2', bg=FIELD, fg=PAPER))
    w('obliv1a-mark-plaque.svg',       mark_svg(64, 32, 'm3', border=5))
    w('obliv1a-favicon.svg',           mark_svg(64, 38, 'm4', bg=FIELD, fg=PAPER, erased=False))
    w('obliv1a-lockup-horizontal.svg', lockup_h())
    w('obliv1a-lockup-stacked.svg',    lockup_v())
    w('obliv1a-construction.svg', construction_svg())
    w('_sprite.svg', sprite())
    print(f'  wordmark {total:.1f}x{CAP_OUT:g}  ratio {total/CAP_OUT:.3f}:1')


