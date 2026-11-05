import type {CSSProperties} from 'react';
import {BookBand} from '../components/BookBand';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow, Lines} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {explore, site} from '../content';
import {useReveals} from '../hooks/useReveals';

export default function Explore() {
  const {hero} = explore;
  return (
    <>
      <PageHero slides={[{name: hero.image, alt: hero.alt}]} eyebrow={hero.eyebrow} lines={hero.lines} body={hero.body} />
      <Intro />
      <Nearby />
      <Things />
      <Getting />
      <BookBand title={[{t: 'Stay in the'}, {t: 'heart of it.', i: true}]} />
    </>
  );
}

function Intro() {
  const ref = useReveals<HTMLElement>();
  const {intro} = explore;
  return (
    <section ref={ref} className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1680px] gap-10 md:grid-cols-12">
        <h2 data-reveal className="display text-[clamp(44px,5.4vw,96px)] md:col-span-5">
          <Lines lines={intro.title} />
        </h2>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="lede">
            {intro.lede}
          </p>
          <p data-reveal className="copy mt-6 max-w-[60ch] text-ink/80">
            {intro.body}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Distances from the front door, grouped. */
function Nearby() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="nearby-title" className="bg-ink px-5 py-24 text-paper md:px-14 md:py-32">
      <div className="mx-auto max-w-[1680px]">
        <Eyebrow className="text-paper/75">From our front door</Eyebrow>
        <h2 id="nearby-title" data-reveal className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
          <span className="block">What’s</span>
          <span className="it block">nearby</span>
        </h2>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {explore.nearby.map((g, gi) => (
            <div key={g.group} data-reveal style={{'--d': `${gi * 0.1}s`} as CSSProperties}>
              <h3 className="caps border-b border-paper/25 pb-3 text-daisy">{g.group}</h3>
              <dl>
                {g.items.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-paper/15 py-4">
                    <dt className="copy text-[16px]">{k}</dt>
                    <dd className="display shrink-0 text-[28px] normal-case tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
        <p className="caps mt-8 text-paper/60">Shortest walking or driving distances, as listed on Booking.com.</p>
      </div>
    </section>
  );
}

function Things() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="things-title" className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto max-w-[1680px]">
        <Eyebrow className="text-cobalt">Long walks, birds & wind</Eyebrow>
        <h2 id="things-title" data-reveal className="display mt-4 text-[clamp(44px,5.4vw,96px)]">
          <span className="block">Days out</span>
          <span className="it block">in Paternoster</span>
        </h2>
        <ul className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {explore.things.map((t, i) => (
            <li key={t.title} data-reveal style={{'--d': `${(i % 3) * 0.08}s`} as CSSProperties} className={i % 3 === 1 ? 'lg:mt-20' : ''}>
              <div className="overflow-hidden">
                <Img name={t.name} alt={t.alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/5] w-full object-cover" />
              </div>
              <h3 className="display mt-5 text-[34px]">{t.title}</h3>
              <p className="copy mt-2 max-w-[42ch] text-ink/80">{t.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Getting() {
  const ref = useReveals<HTMLElement>();
  const {getting} = explore;
  return (
    <section ref={ref} aria-labelledby="getting-title" className="bg-shell px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-10 md:grid-cols-12 md:items-end">
        <h2 id="getting-title" data-reveal className="display text-[clamp(44px,5.4vw,96px)] md:col-span-5">
          <Lines lines={getting.title} />
        </h2>
        <div data-reveal className="md:col-span-6 md:col-start-7">
          <p className="lede">{getting.text}</p>
          <address className="copy mt-6 not-italic text-ink/80">{site.address.join(', ')}</address>
          <a href={site.maps} target="_blank" rel="noopener" className="caps mt-8 inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3 text-paper transition-colors hover:bg-cobalt">
            <Icon name="pin" className="size-4" /> Directions in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
