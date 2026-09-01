#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

let sharp;
try {
  sharp = require('sharp');
} catch {
  console.error('sharp is required. Run: npm install');
  process.exit(1);
}

const root = path.resolve(__dirname, '..');
const resourcesDir = path.join(root, 'resources');
const iconsetDir = path.join(resourcesDir, 'icon.iconset');

/** Dock / 应用图标：紫色渐变 + 边缘高光，接近 macOS 图标立体感 */
function appIconSvg(size) {
  const s = size;
  const pad = s * 0.06;
  const inner = s - pad * 2;
  const cx = s / 2;
  const cy = s / 2;
  const fontSize = inner * 0.56;
  const baselineY = cy + fontSize * 0.36;
  const rx = inner * 0.22;
  const strokeW = Math.max(1, s * 0.012);
  const glossH = inner * 0.34;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4338ca"/>
      <stop offset="50%" stop-color="#5b21b6"/>
      <stop offset="100%" stop-color="#3b0764"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="${pad}" x2="0" y2="${pad + glossH}">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
      <stop offset="45%" stop-color="#ffffff" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="shade" x1="0" y1="${pad + inner * 0.6}" x2="0" y2="${pad + inner}">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.28"/>
    </linearGradient>
    <filter id="shadow" x="-20%" y="-10%" width="140%" height="140%">
      <feDropShadow dx="0" dy="${Math.max(1, s * 0.02)}" stdDeviation="${Math.max(1, s * 0.025)}" flood-color="#000000" flood-opacity="0.28"/>
    </filter>
    <clipPath id="clip">
      <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${rx}"/>
    </clipPath>
  </defs>
  <g filter="url(#shadow)">
    <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${rx}" fill="url(#bg)"/>
    <g clip-path="url(#clip)">
      <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" fill="url(#shine)"/>
      <rect x="${pad}" y="${pad + inner * 0.55}" width="${inner}" height="${inner * 0.45}" fill="url(#shade)"/>
    </g>
    <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${rx}" fill="none"
          stroke="#ffffff" stroke-opacity="0.26" stroke-width="${strokeW}"/>
    <rect x="${pad + strokeW * 1.2}" y="${pad + strokeW * 1.2}" width="${inner - strokeW * 2.4}" height="${inner - strokeW * 2.4}" rx="${rx - strokeW}"
          fill="none" stroke="#ffffff" stroke-opacity="0.08" stroke-width="${strokeW * 0.6}"/>
  </g>
  <text x="${cx}" y="${baselineY}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" fill="#ffffff"
        style="paint-order:stroke fill" stroke="#ffffff" stroke-opacity="0.15" stroke-width="${Math.max(0.5, s * 0.004)}">A</text>
</svg>`);
}

/** 菜单栏托盘：白底黑字，小尺寸更清晰 */
function trayIconSvg(size) {
  const s = size;
  const pad = s * 0.06;
  const inner = s - pad * 2;
  const cx = s / 2;
  const cy = s / 2;
  const fontSize = inner * 0.58;
  const baselineY = cy + fontSize * 0.36;
  const rx = inner * 0.2;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <rect x="${pad}" y="${pad}" width="${inner}" height="${inner}" rx="${rx}" fill="#ffffff" stroke="#d1d1d6" stroke-width="${Math.max(1, s * 0.04)}"/>
  <text x="${cx}" y="${baselineY}" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${fontSize}" font-weight="600" fill="#1d1d1f">A</text>
</svg>`);
}

async function pngFromSvg(svgBuffer, size) {
  return sharp(svgBuffer)
    .resize(size, size)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
}

function writeIco(entries, outputPath) {
  const headerSize = 6;
  const entrySize = 16;
  let offset = headerSize + entries.length * entrySize;
  const header = Buffer.alloc(offset);

  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  entries.forEach((entry, index) => {
    const pos = headerSize + index * entrySize;
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, pos);
    header.writeUInt8(entry.size >= 256 ? 0 : entry.size, pos + 1);
    header.writeUInt8(0, pos + 2);
    header.writeUInt8(0, pos + 3);
    header.writeUInt16LE(1, pos + 4);
    header.writeUInt16LE(32, pos + 6);
    header.writeUInt32LE(entry.buffer.length, pos + 8);
    header.writeUInt32LE(offset, pos + 12);
    offset += entry.buffer.length;
  });

  fs.writeFileSync(outputPath, Buffer.concat([header, ...entries.map((entry) => entry.buffer)]));
}

async function buildMacIcns() {
  if (process.platform !== 'darwin') {
    return;
  }

  const iconsetFiles = [
    ['icon_16x16.png', 16],
    ['icon_16x16@2x.png', 32],
    ['icon_32x32.png', 32],
    ['icon_32x32@2x.png', 64],
    ['icon_128x128.png', 128],
    ['icon_128x128@2x.png', 256],
    ['icon_256x256.png', 256],
    ['icon_256x256@2x.png', 512],
    ['icon_512x512.png', 512],
    ['icon_512x512@2x.png', 1024],
  ];

  fs.rmSync(iconsetDir, { recursive: true, force: true });
  fs.mkdirSync(iconsetDir, { recursive: true });

  for (const [name, size] of iconsetFiles) {
    fs.writeFileSync(path.join(iconsetDir, name), await pngFromSvg(appIconSvg(size), size));
  }

  execFileSync('iconutil', ['-c', 'icns', iconsetDir, '-o', path.join(resourcesDir, 'icon.icns')], {
    stdio: 'inherit',
  });
}

async function buildIco() {
  const sizes = [16, 32, 48, 64, 128, 256];
  const entries = [];
  for (const size of sizes) {
    entries.push({ size, buffer: await pngFromSvg(appIconSvg(size), size) });
  }
  writeIco(entries, path.join(resourcesDir, 'icon.ico'));
}

async function main() {
  fs.mkdirSync(resourcesDir, { recursive: true });
  fs.writeFileSync(path.join(resourcesDir, 'icon.svg'), appIconSvg(1024));
  fs.writeFileSync(path.join(resourcesDir, 'icon.png'), await pngFromSvg(appIconSvg(1024), 1024));
  fs.writeFileSync(path.join(resourcesDir, 'tray-icon.png'), await pngFromSvg(trayIconSvg(44), 44));
  fs.writeFileSync(path.join(resourcesDir, 'tray-icon@2x.png'), await pngFromSvg(trayIconSvg(88), 88));
  await buildMacIcns();
  await buildIco();
  console.log('Icons generated in resources/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
