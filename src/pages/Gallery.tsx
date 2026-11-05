import {useCallback, useEffect, useRef, useState, type CSSProperties} from 'react';
import {BookBand} from '../components/BookBand';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow, Lines} from '../components/Lines';
import {gallery, type Shot} from '../content';
import {useReveals} from '../hooks/useReveals';
import {lockScroll, unlockScroll} from '../lib/scroll';

type Filter = (typeof gallery.filters)[number]['id'];

export default function Gallery() {
  const ref = useReveals<HTMLElement>();
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<number | null>(null);
  const shots = filter === 'all' ? gallery.shots : gallery.shots.filter((s) => s.tag === filter);

  return (
    <>
      <section ref={ref} className="bg-ink px-5 pt-36 pb-24 text-paper md:px-14 md:pt-44">
        <div className="mx-auto max-w-[1680px]">
          <Eyebrow className="text-paper/75">{gallery.eyebrow}</Eyebrow>
          <h1 className="display mt-6 text-[clamp(52px,8vw,150px)]">
            <Lines lines={gallery.title} indentFirst />
          </h1>

          <div role="group" aria-label="Show photos of" className="mt-12 flex flex-wrap gap-2">
            {gallery.filters.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={`caps min-h-11 cursor-pointer border px-5 py-2 transition-colors ${
                  filter === f.id ? 'border-daisy bg-daisy text-ink' : 'border-paper/35 text-paper hover:border-paper'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="caps mt-4 text-paper/60" aria-live="polite">
            {shots.length} photos
          </p>

          <ul className="mt-10 columns-1 gap-3 sm:columns-2 lg:columns-3">
            {shots.map((s, i) => (
              <li key={s.name} className="mb-3 break-inside-avoid" data-reveal style={{'--d': `${(i % 3) * 0.06}s`} as CSSProperties}>
                <button type="button" onClick={() => setOpen(i)} className="group relative block w-full cursor-zoom-in overflow-hidden" aria-label={`Open photo: ${s.alt}`}>
                  <Img name={s.name} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="w-full transition-transform duration-[900ms] ease-silk group-hover:scale-[1.04]" />
                  <span className="caps absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgb(14_26_34/0.75),transparent)] p-4 pt-10 text-left text-paper opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    {s.alt}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <BookBand />
      {open !== null && <Lightbox shots={shots} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </>
  );
}

/** Full-screen viewer: arrow keys or buttons to move, swipe on touch, Escape to close. */
function Lightbox({shots, index, onIndex, onClose}: {shots: Shot[]; index: number; onIndex: (i: number) => void; onClose: () => void}) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);
  const n = shots.length;
  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex]);
  const shot = shots[index];

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    lockScroll();
    closeBtn.current?.focus();
    return () => {
      unlockScroll();
      before?.focus({preventScroll: true});
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // Keep focus inside the viewer.
        const f = dialog.current?.querySelectorAll<HTMLElement>('button');
        if (!f || !f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const btn = 'flex size-12 cursor-pointer items-center justify-center bg-paper/10 text-paper backdrop-blur transition-colors hover:bg-paper hover:text-ink';

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95"
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
      }}
    >
      <div className="flex items-center justify-between gap-4 p-4 md:px-8">
        <p className="caps text-paper/75" aria-live="polite">
          {index + 1} / {n}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} className={btn}>
          <Icon name="close" label="Close photo viewer" />
        </button>
      </div>
      <figure className="flex min-h-0 flex-1 flex-col items-center justify-center px-4 md:px-24">
        <Img key={shot.name} name={shot.name} alt={shot.alt} sizes="100vw" eager className="max-h-full min-h-0 w-auto max-w-full object-contain" />
        <figcaption className="copy mt-4 text-center text-[15px] text-paper/80">{shot.alt}</figcaption>
      </figure>
      <div className="flex justify-center gap-3 p-4 md:absolute md:inset-x-6 md:top-1/2 md:-translate-y-1/2 md:justify-between md:p-0">
        <button type="button" onClick={() => go(-1)} className={btn}>
          <Icon name="arrowLeft" label="Previous photo" />
        </button>
        <button type="button" onClick={() => go(1)} className={btn}>
          <Icon name="arrowRight" label="Next photo" />
        </button>
      </div>
    </div>
  );
}
