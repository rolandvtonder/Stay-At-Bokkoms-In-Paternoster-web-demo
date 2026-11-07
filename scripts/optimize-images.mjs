/**
 * Turns every photo in media/photos/ into web-ready WebP files in
 * public/media/ (a 1280px "full" size and a 640px "-sm" size for srcset), and
 * writes src/media-manifest.json with each picture's real width and height so
 * every <img> can reserve its space before it loads (no layout shift).
 *
 * A photo's web name is its file name without the extension, so
 * media/photos/house-white.jpg becomes "house-white". Photos uploaded through
 * the editing page (Pages CMS) land in media/photos/ too, and the deploy
 * workflow runs this script before every build, so they are resized
 * automatically. Locally, `npm run dev` runs it first.
 *
 * Unchanged photos are skipped, so repeat runs are quick.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'media/photos';
const OUT = 'public/media';
const TYPES = /\.(jpe?g|png|webp|avif|tiff?|heic|heif)$/i;

/** Same rule the site uses to turn an image path into a web name. */
export const webName = (file) =>
  path.basename(file).replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const fresh = (out, src) => fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

fs.mkdirSync(OUT, {recursive: true});
const manifest = {};
let made = 0;

for (const file of fs.readdirSync(SRC).filter((f) => TYPES.test(f)).sort()) {
  const name = webName(file);
  const src = path.join(SRC, file);
  const full = path.join(OUT, `${name}.webp`);
  const small = path.join(OUT, `${name}-sm.webp`);
  if (manifest[name]) {
    console.warn(`Skipped ${file}: another photo is already called "${name}".`);
    continue;
  }
  try {
    if (fresh(full, src) && fresh(small, src)) {
      const {width, height} = await sharp(full).metadata();
      manifest[name] = {w: width, h: height};
      continue;
    }
    const base = sharp(src).rotate();
    const info = await base.clone().resize({width: 1280, withoutEnlargement: true}).webp({quality: 78}).toFile(full);
    await base.clone().resize({width: 640, withoutEnlargement: true}).webp({quality: 72}).toFile(small);
    manifest[name] = {w: info.width, h: info.height};
    made++;
  } catch (e) {
    // A file that isn't a readable picture shouldn't stop the whole site from publishing.
    console.warn(`Skipped ${file}: ${e.message}`);
  }
}

// The logo is the Facebook profile picture: the white gable of the house.
const logo = 'media/source/facebook/profile.jpg';
if (!fresh(path.join(OUT, 'favicon.png'), logo)) {
  await sharp(logo).resize(200, 200).webp({quality: 85}).toFile(path.join(OUT, 'logo.webp'));
  const circle = Buffer.from('<svg width="64" height="64"><circle cx="32" cy="32" r="32"/></svg>');
  await sharp(logo).resize(64, 64).composite([{input: circle, blend: 'dest-in'}]).png().toFile(path.join(OUT, 'favicon.png'));
  await sharp(logo).resize(180, 180).png().toFile(path.join(OUT, 'apple-touch-icon.png'));
}

// The picture shown when the site is shared on WhatsApp or Facebook (1200 × 630).
const share = path.join(SRC, 'house-white.jpg');
if (fs.existsSync(share) && !fresh(path.join(OUT, 'share.jpg'), share)) {
  await sharp(share).rotate().resize(1200, 630, {fit: 'cover', position: 'attention'}).jpeg({quality: 82, mozjpeg: true}).toFile(path.join(OUT, 'share.jpg'));
}

fs.writeFileSync('src/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`${Object.keys(manifest).length} photos → ${OUT} (${made} new or changed)`);
