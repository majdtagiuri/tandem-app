/**
 * Rebuild icons.js from every *.svg currently in /icons.
 * Usage: node scripts/regenerate-icons.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const iconsDir = path.join(root, 'icons');
const outFile = path.join(root, 'icons.js');

const files = fs
  .readdirSync(iconsDir)
  .filter((f) => f.endsWith('.svg'))
  .sort((a, b) => a.localeCompare(b));

const entries = files.map((file) => {
  const key = file.replace(/\.svg$/i, '');
  const svg = fs.readFileSync(path.join(iconsDir, file), 'utf8').trim();
  const escaped = svg.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
  return `  '${key}': \`${escaped}\``;
});

const body = entries.length ? entries.join(',\n') + '\n' : '';

const output = `/* Auto-generated from /icons — do not edit by hand.
 * Regenerate after adding, removing, or swapping files in /icons.
 * Run: node scripts/regenerate-icons.mjs
 */

const ICONS = {
${body}};

export function renderIcon(name, className = '') {
  const classes = ['icon', className].filter(Boolean).join(' ');
  return \`<span class="\${classes}">\${ICONS[name] || ''}</span>\`;
}
`;

fs.writeFileSync(outFile, output, 'utf8');
console.log(`Wrote ${files.length} icon(s) → icons.js`);
