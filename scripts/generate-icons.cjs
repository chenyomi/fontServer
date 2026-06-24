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

function iconSvg(size) {
  const s = size;
  const pad = s * 0.12;
  const inner = s - pad * 2;
  return Buffer.from(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5"/>
      <stop offset="100%" stop-color="#7c3aed"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${s}" height="${s}" rx="${s * 0.18}" fill="url(#bg)"/>
  <text x="50%" y="58%" text-anchor="middle" dominant-baseline="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="${inner * 0.62}" fill="#ffffff">A</text>
</svg>`);
}

async function png(size) {
  return sharp(iconSvg(size))
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
    fs.writeFileSync(path.join(iconsetDir, name), await png(size));
  }

  execFileSync('iconutil', ['-c', 'icns', iconsetDir, '-o', path.join(resourcesDir, 'icon.icns')], {
    stdio: 'inherit',
  });
}

async function buildIco() {
  const sizes = [16, 32, 48, 64, 128, 256];
  const entries = [];
  for (const size of sizes) {
    entries.push({ size, buffer: await png(size) });
  }
  writeIco(entries, path.join(resourcesDir, 'icon.ico'));
}

async function main() {
  fs.mkdirSync(resourcesDir, { recursive: true });
  fs.writeFileSync(path.join(resourcesDir, 'icon.svg'), iconSvg(1024));
  fs.writeFileSync(path.join(resourcesDir, 'icon.png'), await png(1024));
  await buildMacIcns();
  await buildIco();
  console.log('Icons generated in resources/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
