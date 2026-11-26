// Generates PWA icons from the PrimeScore gauge-"P" mark.
// Usage: node scripts/gen-icons.mjs
import sharp from "sharp";
import { mkdirSync } from "node:fs";

const mark = (fg = "#262A6B") => `
  <g fill="none" stroke-width="106">
    <path d="M207 297.3 A260 260 0 0 1 275.8 142.7" stroke="#ED1C24"/>
    <path d="M298.9 120.8 A260 260 0 0 1 633.1 120.8" stroke="#E8D90C"/>
    <path d="M656.2 142.7 A260 260 0 0 1 725 297.3" stroke="#72BE44"/>
    <path d="M725 342.7 A260 260 0 0 1 207 342.7" stroke="${fg}"/>
  </g>
  <rect x="153" y="340" width="107" height="410" fill="${fg}"/>
  <path d="M440 300 L582 256 Q596 254 590 268 L478 344 Q452 360 438 336 Q428 312 440 300Z" fill="${fg}"/>`;

// mark viewBox is 130 0 680 760 → center (470, 380)
function svg({ size, pad, bg, fg, radius }) {
  const inner = size * (1 - pad * 2);
  const scale = inner / 760;
  const tx = size / 2 - 470 * scale;
  const ty = size / 2 - 380 * scale;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>
    <g transform="translate(${tx} ${ty}) scale(${scale})">${mark(fg)}</g>
  </svg>`);
}

mkdirSync("public/icons", { recursive: true });
const jobs = [
  ["icon-192.png", { size: 192, pad: 0.14, bg: "#ffffff", fg: "#262A6B", radius: 0 }],
  ["icon-512.png", { size: 512, pad: 0.14, bg: "#ffffff", fg: "#262A6B", radius: 0 }],
  ["maskable-512.png", { size: 512, pad: 0.24, bg: "#ffffff", fg: "#262A6B", radius: 0 }],
  ["apple-touch-icon.png", { size: 180, pad: 0.15, bg: "#ffffff", fg: "#262A6B", radius: 0 }],
];
for (const [name, opts] of jobs) {
  await sharp(svg(opts)).png().toFile(`public/icons/${name}`);
  console.log("wrote", name);
}
await sharp(svg({ size: 48, pad: 0.06, bg: "#ffffff", fg: "#262A6B", radius: 10 })).png().toFile("src/app/icon.png");
console.log("wrote src/app/icon.png");
