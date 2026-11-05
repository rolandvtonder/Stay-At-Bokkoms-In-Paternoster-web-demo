# Stay at Bokkoms in Paternoster — website demo

A six-page website for Stay at Bokkoms, a self-catering guest flat in Paternoster on South Africa's West Coast.

**Pages:** Home · The Stay · Gallery · Paternoster · Reviews & Hosts · Book & Contact

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

- **Text, prices, facts and links:** `src/content.ts`
- **Photos:** put originals in `media/source/`, list them in `scripts/optimize-images.mjs`, then run `npm run images`
- **Colours and fonts:** the `@theme` block at the top of `src/index.css`

Built with Vite, React, TypeScript, Tailwind CSS and Lenis.
