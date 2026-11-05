import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {pages, site, socials, type PageId} from '../content';
import {to} from '../lib/media';

/**
 * The menu: three slabs wipe in from the right one after another
 * (ink, cobalt, whitewash); the whitewash one stays and holds the pages.
 * Hovering a page name ripples it like heat shimmer off the sea — an SVG
 * turbulence + displacement filter whose strength and phase move per frame.
 */
export function Menu({open, onClose, page}: {open: boolean; onClose: () => void; page: PageId}) {
  const [hover, setHover] = useState(-1);
  const turb = useRef<SVGFETurbulenceElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const nav = useRef<HTMLElement>(null);
  const first = useRef<HTMLAnchorElement>(null);

  // Animate the ripple only while something is hovered.
  useEffect(() => {
    if (hover < 0) return;
    let raf = 0;
    let t = 0;
    let amp = 0;
    const loop = () => {
      t += 0.016;
      amp = Math.min(1, amp + 0.08);
      turb.current?.setAttribute('baseFrequency', `${(0.012 + Math.sin(t * 2.1) * 0.004).toFixed(4)} ${(0.06 + Math.cos(t * 1.7) * 0.02).toFixed(4)}`);
      turb.current?.setAttribute('seed', String(Math.floor(t * 12) % 50));
      disp.current?.setAttribute('scale', (amp * 9).toFixed(2));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [hover]);

  // Escape closes; focus moves into the menu once the slabs have landed,
  // and back to the menu button when it closes.
  useEffect(() => {
    if (!open) {
      if (nav.current?.contains(document.activeElement)) document.getElementById('menu-button')?.focus();
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(34vw,480px)] max-md:w-full transition-transform duration-[800ms] ease-wipe motion-reduce:duration-0 ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: ink → cobalt → whitewash, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <svg className="absolute size-0" aria-hidden>
        <filter id="ripple" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="2" result="n" />
          <feDisplacementMap ref={disp} in="SourceGraphic" in2="n" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/30 transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-ink')} style={delay(0)} />
      <div className={slab('bg-cobalt')} style={delay(1)} />
      <nav ref={nav} className={slab('flex flex-col justify-between overflow-y-auto bg-paper px-8 pt-24 pb-28 text-ink')} style={delay(2)} aria-label="Main menu">
        <ul onMouseLeave={() => setHover(-1)}>
          {pages.map((p, i) => {
            const current = p.id === page;
            return (
              <li
                key={p.id}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'} as CSSProperties}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={to(p.href)}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onClick={(e) => {
                    if (!current) return;
                    e.preventDefault();
                    onClose();
                  }}
                  className={`display relative inline-block py-1 text-[clamp(34px,3.1vw,48px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-35' : 'opacity-100'
                  }`}
                  style={{filter: hover === i ? 'url(#ripple)' : 'none'}}
                >
                  {current && <span aria-hidden className="absolute top-1/2 -left-5 size-2 -translate-y-1/2 rounded-full bg-cobalt" />}
                  <span className={current ? 'it' : ''}>{p.label}</span>
                  <sup className="caps absolute top-2 -right-7 text-[10px] tracking-normal text-ink/60">0{i + 1}</sup>
                </a>
              </li>
            );
          })}
        </ul>
        <div className={`mt-10 space-y-6 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <p className="caps text-ink/60">Talk to us</p>
            <a href={site.phoneHref} className="display mt-1 inline-block text-[26px] hover:text-cobalt">
              {site.phone}
            </a>
          </div>
          <div>
            <p className="caps text-ink/60">Elsewhere</p>
            <div className="mt-1 flex flex-wrap gap-x-5">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener" className="caps inline-block py-2 text-ink/85 hover:text-cobalt">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
