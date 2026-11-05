import {useEffect, useRef, type ReactNode} from 'react';
import type {Line} from '../content';
import type {MediaName} from '../lib/media';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Img} from './Img';
import {Eyebrow, Lines} from './Lines';

type Slide = {name: MediaName; alt: string};

/**
 * Full-bleed photo opening for every page, under a big condensed headline
 * that mixes upright and italic lines. With several slides the photos
 * cross-fade while slowly zooming; with one, it breathes in and out. As you
 * scroll on, the photo blurs, dims and sinks back — the camera pulling away.
 */
export function PageHero({
  slides,
  lines,
  body,
  eyebrow,
  full = false,
  children,
}: {
  slides: Slide[];
  lines: Line[];
  body?: string;
  eyebrow?: string;
  full?: boolean;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const h = window.innerHeight;
        const p = clamp(-el.getBoundingClientRect().top / el.offsetHeight);
        // Pause the photo motion once the hero has scrolled out of view.
        if (p >= 0.98) s.setAttribute('data-paused', '');
        else s.removeAttribute('data-paused');
        s.style.transform = `translate3d(0, ${(p * h * 0.5).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 18).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [],
  );

  const many = slides.length > 1;

  return (
    <section ref={root} className={`relative overflow-hidden bg-ink ${full ? 'h-svh min-h-[620px]' : 'h-[88svh] min-h-[560px]'}`}>
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((s, i) => (
            <Img
              key={s.name}
              name={s.name}
              alt={many && i > 0 ? '' : s.alt}
              eager={i === 0}
              className={many ? 'kb-slide' : 'kb-single absolute inset-0 h-full w-full object-cover'}
              style={many ? {animationDelay: `${i * 7 - 1.2}s`} : undefined}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(14_26_34/0.62),rgb(14_26_34/0.28)_45%,rgb(14_26_34/0.05)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(0deg,rgb(14_26_34/0.45),transparent)]" />
        {/* On phones the headline covers most of the photo; tint it a touch more. */}
        <div className="absolute inset-0 bg-ink/25 md:hidden" />
        {/* Keeps the logo and menu legible over busy photos. */}
        <div className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgb(14_26_34/0.55),transparent)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(104px,14vh,150px)] md:px-14">
          {eyebrow && <Eyebrow className="mb-6 text-paper/85">{eyebrow}</Eyebrow>}
          <h1
            className={`display text-paper drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)] ${
              full ? 'text-[clamp(46px,7.6vw,138px)]' : 'text-[clamp(44px,6.6vw,118px)]'
            }`}
          >
            <Lines lines={lines} indentFirst={full} />
          </h1>
          {body && (
            <p className="caps mt-9 max-w-[340px] text-[13px] text-paper [text-shadow:0_1px_14px_rgb(14_26_34/0.9),0_0_2px_rgb(14_26_34/0.6)] md:ml-[clamp(0px,19vw,330px)]">
              {body}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
