/**
 * Site-wide details (contact, links, menu) live here. The page text and photos
 * live in content/*.json so the hosts can edit them on the editing page; facts
 * first came from the Booking.com listing and Facebook page (November 2026).
 */
import type {MediaName} from './lib/media';

export type Line = {t: string; i?: boolean};
export type PageId = 'home' | 'stay' | 'gallery' | 'explore' | 'reviews' | 'contact';

export const site = {
  name: 'Stay at Bokkoms',
  short: 'Bokkoms',
  place: 'Paternoster',
  phone: '079 746 2868',
  phoneHref: 'tel:+27797462868',
  whatsapp: 'https://wa.me/27797462868',
  email: 'stayatbokkomsinpaternoster@yahoo.com',
  address: ['10 Kriedoring Street', 'Bekbaai, Paternoster', 'Western Cape, 7381'],
  maps: 'https://www.google.com/maps/search/?api=1&query=10+Kriedoring+Street+Bekbaai+Paternoster+7381',
  /** Direct booking engine — the main "Book now" everywhere. Opens in a new tab. */
  book: 'https://book.nightsbridge.com/17491',
  /** Not linked for now, at the hosts' request (they can't access the page). Add it back to `socials` to re-link. */
  facebook: 'https://www.facebook.com/StayatBokkomsinPaternoster/',
  instagram: 'https://www.instagram.com/stayatbokkomsinpaternoster/',
  credit: {label: 'Roland Web Design', href: 'https://rolandwebdesign.co.za'},
};

/** The pages, in menu order. `href` is relative to the site root. */
export const pages: {id: PageId; href: string; label: string}[] = [
  {id: 'home', href: '', label: 'Home'},
  {id: 'stay', href: 'stay.html', label: 'The Stay'},
  {id: 'gallery', href: 'gallery.html', label: 'Gallery'},
  {id: 'explore', href: 'explore.html', label: 'Paternoster'},
  {id: 'reviews', href: 'reviews.html', label: 'Reviews & Hosts'},
  {id: 'contact', href: 'contact.html', label: 'Book & Contact'},
];

export const socials = [
  {label: 'Instagram', href: site.instagram},
  {label: 'WhatsApp', href: site.whatsapp},
  {label: 'Book online', href: site.book},
];

/*
 * The page text and photos below are edited on the editing page (Pages CMS,
 * configured in .pages.yml) and stored in content/*.json. This file turns
 * those friendly formats back into the shapes the pages use:
 *  - a title is one line per row, and a row wrapped in *stars* is in italics;
 *  - a photo is its path in media/photos/, and its web name is the file name.
 */
import homeData from '../content/home.json';
import stayData from '../content/stay.json';
import galleryData from '../content/gallery.json';
import exploreData from '../content/explore.json';
import reviewsData from '../content/reviews.json';
import contactData from '../content/contact.json';

type Pair = {label: string; value: string};
type Hero = {image: string; alt: string; eyebrow: string; lines: string; body: string};

/** "/media/photos/House White.jpg" → "house-white" (same rule as scripts/optimize-images.mjs). */
const photo = (p: string) =>
  (p.split('/').pop() ?? '').replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') as MediaName;

/** "Salt air,\n*white walls.*" → [{t: 'Salt air,'}, {t: 'white walls.', i: true}] */
const lines = (s: string): Line[] =>
  s.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => {
    const m = /^\*(.+)\*$/.exec(l);
    return m ? {t: m[1].trim(), i: true} : {t: l};
  });

const pairs = (ps: Pair[]) => ps.map((p) => [p.label, p.value] as [string, string]);
const hero = (h: Hero) => ({image: photo(h.image), alt: h.alt, eyebrow: h.eyebrow, lines: lines(h.lines), body: h.body});

/* ------------------------------------------------------------------ Home */

export const home = {
  hero: {
    slides: homeData.hero.slides.map((s) => ({name: photo(s.image), alt: s.alt})),
    lines: lines(homeData.hero.lines),
    body: homeData.hero.body,
  },
  /** Each panel has its own photo, so the three read as three different things. */
  panels: {
    items: homeData.panels.map((p) => ({
      id: p.id,
      image: photo(p.image),
      pos: p.pos,
      alt: p.alt,
      title: [lines(p.title)[0]?.t ?? '', lines(p.title)[1]?.t ?? ''] as [string, string],
      specs: pairs(p.specs),
      href: p.href,
      tint: p.tint,
    })),
  },
  intro: {...homeData.intro, title: lines(homeData.intro.title)},
  stats: homeData.stats.map((s) => [s.value, s.label] as [string, string]),
  quote: homeData.quote,
  duo: homeData.duo.map((d) => ({name: photo(d.image), alt: d.alt, caption: d.caption})),
};

/* ------------------------------------------------------------------ Stay */

export const stay = {
  hero: hero(stayData.hero),
  facts: pairs(stayData.facts),
  rooms: stayData.rooms.map((r) => ({name: photo(r.image), alt: r.alt, kicker: r.kicker, title: lines(r.title), text: r.text})),
  amenities: stayData.amenities as {icon: IconName; label: string}[],
  rules: pairs(stayData.rules),
  notes: stayData.notes,
};

export type IconName =
  | 'wifi' | 'car' | 'zap' | 'flame' | 'utensils' | 'bath' | 'bed' | 'tv' | 'laptop' | 'waves'
  | 'leaf' | 'paw' | 'bike' | 'sparkle' | 'key' | 'smokeOff' | 'phone' | 'mail' | 'pin'
  | 'chat' | 'arrowRight' | 'arrowLeft' | 'arrowUpRight' | 'close' | 'clock' | 'star' | 'calendar';

/* --------------------------------------------------------------- Gallery */

export type Shot = {name: MediaName; alt: string; tag: 'inside' | 'outside' | 'village'};

export const gallery = {
  eyebrow: galleryData.eyebrow,
  title: lines(galleryData.title),
  filters: [
    {id: 'all', label: 'Everything'},
    {id: 'inside', label: 'Inside'},
    {id: 'outside', label: 'Patio & garden'},
    {id: 'village', label: 'Paternoster'},
  ] as const,
  shots: galleryData.shots.map((s) => ({name: photo(s.image), alt: s.alt, tag: s.tag})) as Shot[],
};

/* --------------------------------------------------------------- Explore */

export const explore = {
  hero: hero(exploreData.hero),
  intro: {...exploreData.intro, title: lines(exploreData.intro.title)},
  nearby: exploreData.nearby.map((g) => ({group: g.group, items: pairs(g.items)})),
  things: exploreData.things.map((t) => ({name: photo(t.image), pos: t.pos || undefined, alt: t.alt, title: t.title, text: t.text})),
  getting: {title: lines(exploreData.getting.title), text: exploreData.getting.text},
};

/* --------------------------------------------------------------- Reviews */

export const reviews = {
  ...reviewsData,
  title: lines(reviewsData.title),
  categories: reviewsData.categories.map((c) => [c.label, Number(c.score)] as [string, number]),
  hosts: {...reviewsData.hosts, title: lines(reviewsData.hosts.title), image: photo(reviewsData.hosts.image)},
  guestbook: {...reviewsData.guestbook, image: photo(reviewsData.guestbook.image)},
};

/* --------------------------------------------------------------- Contact */

export const contact = {
  hero: hero(contactData.hero),
};
