#!/usr/bin/env node
/**
 * Obliv1a contrast audit.
 *
 *   node brand/verify-contrast.mjs
 *
 * Reads the tokens straight out of obliv1a.css and re-derives every ratio the
 * identity system publishes. The spec quotes numbers; this is what makes them
 * true. Exits non-zero if any documented pairing drifts below its floor, so a
 * palette edit cannot quietly break the contract.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const HERE = dirname(fileURLToPath(import.meta.url));
const css  = readFileSync(join(HERE, 'obliv1a.css'), 'utf8');

const tok = {};
for (const m of css.matchAll(/^\s*(--[a-z0-9-]+):\s*(#[0-9A-Fa-f]{6});/gm)) tok[m[1]] = m[2];

const lum = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const f = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const cr = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

/* [foreground, background, floor, what it is] — floor 4.5 body, 3.0 large/UI */
const PAIRS = [
  ['--ink',        '--paper', 4.5, 'body on PAPER'],
  ['--ink-mute',   '--paper', 4.5, 'secondary on PAPER'],
  ['--ink-field',  '--paper', 4.5, 'brand type on PAPER'],
  ['--on-field',   '--field', 4.5, 'body on FIELD'],
  ['--on-field-2', '--field', 4.5, 'secondary on FIELD'],
  ['--on-void',    '--void',  4.5, 'body on VOID'],
  ['--on-void-2',  '--void',  4.5, 'secondary on VOID'],
  ['--signal',     '--void',  4.5, 'SIGNAL on VOID'],
  ['--signal-ink', '--paper', 4.5, 'SIGNAL on PAPER'],
  ['--danger',     '--paper', 4.5, 'danger on PAPER'],
  ['--caution',    '--paper', 4.5, 'caution on PAPER'],
  ['--live',       '--paper', 4.5, 'live on PAPER'],
  ['--paper',      '--field', 4.5, 'FIELD as button ground'],
  ['--field',      '--paper', 3.0, 'FIELD rule on PAPER'],
  ['--rule-field-firm', '--field', 3.0, 'firm rule on FIELD'],
  ['--rule-void-firm',  '--void',  3.0, 'firm rule on VOID'],
];

/* Pairings the system explicitly FORBIDS — these must fail, and the spec
   says so. Guards against someone "fixing" the palette into a wrong rule. */
const FORBIDDEN = [
  ['--signal', '--field', 'SIGNAL never sets type on FIELD'],
  ['--void',   '--field', 'VOID never sets type on FIELD'],
];

let bad = 0;
console.log('\nOBLIV1A // CONTRAST AUDIT\n' + '-'.repeat(64));
for (const [f, b, floor, label] of PAIRS) {
  const v = cr(tok[f], tok[b]);
  const ok = v >= floor;
  if (!ok) bad++;
  const grade = v >= 7 ? 'AAA' : v >= 4.5 ? 'AA' : v >= 3 ? 'AA-lg' : '--';
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${v.toFixed(2).padStart(6)}:1  ${grade.padEnd(6)} ${label}`);
}
console.log('-'.repeat(64));
for (const [f, b, why] of FORBIDDEN) {
  const v = cr(tok[f], tok[b]);
  const stillFails = v < 4.5;
  if (!stillFails) bad++;
  console.log(`${stillFails ? 'HELD' : 'BROKE'} ${v.toFixed(2).padStart(6)}:1         ${why}`);
}
console.log('-'.repeat(64));
console.log(bad === 0 ? 'All documented pairings hold.\n' : `${bad} pairing(s) drifted.\n`);
process.exit(bad === 0 ? 0 : 1);
