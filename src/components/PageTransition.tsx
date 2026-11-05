import {useEffect, useState, type CSSProperties} from 'react';
import {site} from '../content';

const KEY = 'bokkoms-wipe';
const COVER_MS = 820;
const REVEAL_MS = 1100;

type Phase = 'idle' | 'cover' | 'arrived' | 'reveal';

const same = (a: string, b: string) => a.replace(/index\.html$/, '') === b.replace(/index\.html$/, '');

/**
 * Page-to-page transition, in the menu's colours. Clicking a link to another
 * page of the site wipes the three slabs in from the right (ink, cobalt,
 * whitewash); the next page opens covered and wipes them away to the left.
 * A flag in sessionStorage tells the new page it was arrived at this way.
 * With reduced motion, links just navigate.
 */
export function PageTransition({reduced}: {reduced: boolean}) {
  const [phase, setPhase] = useState<Phase>(() => {
    try {
      return sessionStorage.getItem(KEY) ? 'arrived' : 'idle';
    } catch {
      return 'idle';
    }
  });

  // Arrival: start covered, then uncover on the next frames.
  useEffect(() => {
    if (phase !== 'arrived') return;
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* storage blocked: nothing to clear */
    }
    let r2 = 0;
    const r1 = requestAnimationFrame(() => {
      r2 = requestAnimationFrame(() => setPhase('reveal'));
    });
    return () => {
      cancelAnimationFrame(r1);
      cancelAnimationFrame(r2);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = window.setTimeout(() => setPhase('idle'), REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Departure: intercept same-site links to other pages.
  useEffect(() => {
    if (reduced) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || !a.href || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || same(url.pathname, location.pathname)) return;
      e.preventDefault();
      setPhase('cover');
      window.setTimeout(() => {
        try {
          sessionStorage.setItem(KEY, '1');
        } catch {
          /* storage blocked: the next page simply won't wipe in */
        }
        location.href = url.href;
      }, COVER_MS);
    };
    // Coming back through the back button restores a frozen, covered page.
    const onShow = (e: PageTransitionEvent) => e.persisted && setPhase('idle');
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
    };
  }, [reduced]);

  const slab = (k: number, color: string) => {
    const x = phase === 'cover' || phase === 'arrived' ? '0%' : phase === 'reveal' ? '-104%' : '104%';
    const animated = phase === 'cover' || phase === 'reveal';
    // Covering: ink first, whitewash last (on top). Uncovering: whitewash leaves first.
    const d = phase === 'cover' ? k * 0.08 : (2 - k) * 0.08;
    const style: CSSProperties = {
      transform: `translate3d(${x},0,0)`,
      transition: animated ? `transform 700ms var(--ease-wipe) ${d}s` : 'none',
    };
    return <div key={k} className={`absolute inset-0 ${color}`} style={style} />;
  };

  const covering = phase === 'cover' || phase === 'arrived';
  return (
    <div aria-hidden className={`fixed inset-0 z-[90] overflow-hidden ${covering ? '' : 'pointer-events-none'}`}>
      {slab(0, 'bg-ink')}
      {slab(1, 'bg-cobalt')}
      <div
        className="absolute inset-0 flex items-center justify-center bg-paper text-ink"
        style={{
          transform: `translate3d(${covering ? '0%' : phase === 'reveal' ? '-104%' : '104%'},0,0)`,
          transition: phase === 'cover' || phase === 'reveal' ? `transform 700ms var(--ease-wipe) ${phase === 'cover' ? 0.16 : 0}s` : 'none',
        }}
      >
        <p className="display it text-[clamp(40px,6vw,96px)]">{site.short}</p>
      </div>
    </div>
  );
}
