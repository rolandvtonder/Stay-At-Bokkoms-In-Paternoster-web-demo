# Stay at Bokkoms in Paternoster — website demo

A six-page website for Stay at Bokkoms, a self-catering guest flat in Paternoster on South Africa's West Coast.

**Pages:** Home · The Stay · Gallery · Paternoster · Reviews & Hosts · Book & Contact

**Live site:** https://stayatbokkomsinpaternoster.com — republished automatically on every push to `main` (see `.github/workflows/deploy.yml`).

## Run it locally

Requires [Node.js](https://nodejs.org/) 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Build for hosting

```bash
npm run build
```

The finished site is written to `dist/` and can be uploaded to any static host.

## Editing

The hosts edit the text and photos on the editing page at https://app.pagescms.org (set up in `.pages.yml`). Every save republishes the site about a minute later.

- **Page text and photos:** `content/*.json` (one file per page). In headings, each line is a row, and a row wrapped in `*stars*` is shown in italics.
- **Photos:** `media/photos/`. A photo's name on the site is its file name, and `npm run images` (run automatically by `npm run dev`, `npm run build` and the deploy) makes the web-sized copies in `public/media/`.
- **Contact details, links and menu:** `src/content.ts`
- **Colours and fonts:** the `@theme` block at the top of `src/index.css`

Built with Vite, React, TypeScript, Tailwind CSS and Lenis.
