/**
 * Turns the original photos in media/source/ into web-ready WebP files in
 * public/media/ (a 1280px "full" size and a 640px "-sm" size for srcset), and
 * writes src/media-manifest.json with each picture's real width and height so
 * every <img> can reserve its space before it loads (no layout shift).
 *
 * Run with `npm run images` after adding or swapping photos. To use a new
 * photo, drop it into media/source/ and add a line to MAP below.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'media/source';
const OUT = 'public/media';

/**
 * web name → source file (relative to media/source), or
 * [file, {left, top, width, height}] to cut one picture out of a collage.
 */
const MAP = {
  'house-white': 'booking/31894294.jpg',
  'house-daisies': 'booking/31894610.jpg',
  entrance: 'booking/31895899.jpg',
  'daisy-path': 'booking/31906992.jpg',
  gulls: 'booking/31907085.jpg',
  windsurfer: 'booking/31907796.jpg',
  'patio-view': 'booking/31908445.jpg',
  pergola: 'booking/31909037.jpg',
  guestbook: 'booking/319284450.jpg',
  lounge: 'booking/358834503.jpg',
  'kitchen-table': 'booking/406303243.jpg',
  hammocks: 'booking/432395515.jpg',
  'hammocks-2': 'booking/432397545.jpg',
  passage: 'booking/432397720.jpg',
  'stairs-art': 'booking/432397782.jpg',
  'stair-down': 'booking/432397881.jpg',
  library: 'booking/432398191.jpg',
  kitchen: 'booking/432461891.jpg',
  'bedroom-1': 'booking/878959357.jpg',
  // 889925152 is a collage of three stacked photos (alcove, twin beds, bathroom).
  'alcove-room': ['booking/889925152.jpg', {left: 4, top: 6, width: 548, height: 288}],
  'bedroom-2': ['booking/889925152.jpg', {left: 4, top: 308, width: 548, height: 290}],
  'bathroom-2': ['booking/889925152.jpg', {left: 4, top: 610, width: 548, height: 284}],
  // 889926198 is a collage too (bed, fire bowl, patio table).
  'bed-detail': ['booking/889926198.jpg', {left: 4, top: 6, width: 549, height: 288}],
  firepit: ['booking/889926198.jpg', {left: 4, top: 308, width: 549, height: 290}],
  'patio-table': ['booking/889926198.jpg', {left: 4, top: 610, width: 549, height: 284}],
  embroidery: 'booking/167640170.jpg',
  window: 'booking/167643008.jpg',
  'picnic-table': 'booking/224304086.jpg',
  coast: 'booking/247606253.jpg',
  bathroom: 'booking/251243904.jpg',
  kitchenette: 'booking/251244344.jpg',
  'library-stairs': 'booking/251244449.jpg',
  gate: 'booking/265943256.jpg',
  'dog-flowers': 'booking/266585266.jpg',
  'fynbos-sea': 'booking/266585728.jpg',
  'dog-daisies': 'booking/266585953.jpg',
  rocks: 'booking/279613982.jpg',
  aerial: 'booking/281570784.jpg',
  'reading-chair': 'booking/285251434.jpg',
  'kitchen-shelves': 'booking/285251881.jpg',
  collage: 'facebook/cover.jpg',
  // Sent by the hosts in November 2026 for the three home-page panels.
  'panel-stay': 'client/stay.jpg',
  'panel-village': 'client/village.jpg',
  'panel-beach': 'client/beach.jpg',
};

fs.mkdirSync(OUT, {recursive: true});
const manifest = {};

for (const [name, entry] of Object.entries(MAP)) {
  const [file, crop] = Array.isArray(entry) ? entry : [entry, null];
  let base = sharp(path.join(SRC, file)).rotate();
  if (crop) base = sharp(await base.extract(crop).toBuffer());
  const full = await base.clone().resize({width: 1280, withoutEnlargement: true}).webp({quality: 78}).toFile(path.join(OUT, `${name}.webp`));
  await base.clone().resize({width: 640, withoutEnlargement: true}).webp({quality: 72}).toFile(path.join(OUT, `${name}-sm.webp`));
  manifest[name] = {w: full.width, h: full.height};
}

// The logo is the Facebook profile picture: the white gable of the house.
const logo = path.join(SRC, 'facebook/profile.jpg');
await sharp(logo).resize(200, 200).webp({quality: 85}).toFile(path.join(OUT, 'logo.webp'));
const circle = Buffer.from('<svg width="64" height="64"><circle cx="32" cy="32" r="32"/></svg>');
await sharp(logo).resize(64, 64).composite([{input: circle, blend: 'dest-in'}]).png().toFile(path.join(OUT, 'favicon.png'));
await sharp(logo).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));

fs.writeFileSync('src/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`${Object.keys(manifest).length} photos → ${OUT}`);
