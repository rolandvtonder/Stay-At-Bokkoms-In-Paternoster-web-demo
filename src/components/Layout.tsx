import {StrictMode, useCallback, useEffect, useState, type ComponentType} from 'react';
import {createRoot} from 'react-dom/client';
import type {PageId} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {lockScroll, startScroll, unlockScroll} from '../lib/scroll';
import {BookCta, Brand, MenuButton} from './Chrome';
import {Footer} from './Footer';
import {Menu} from './Menu';
import {PageTransition} from './PageTransition';
import '../index.css';

/** Everything every page shares: logo, menu, booking box, footer, transition, grain. */
function Layout({page, Page}: {page: PageId; Page: ComponentType}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <a href="#main" className="skip caps">
        Skip to content
      </a>
      <Brand />
      <MenuButton open={open} onToggle={() => setOpen((o) => !o)} />
      <BookCta page={page} menuOpen={open} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Page />
      </main>
      <Footer />
      <Menu open={open} onClose={close} page={page} />
      <PageTransition reduced={reduced} />
      <div className="grain" aria-hidden />
    </>
  );
}

/** Mounts a page into #root. Each HTML file has a tiny entry that calls this. */
export function mount(page: PageId, Page: ComponentType) {
  // Pages open at the top; the hero motion depends on scroll position.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout page={page} Page={Page} />
    </StrictMode>,
  );
}
