import type {CSSProperties} from 'react';
import {BookBand} from '../components/BookBand';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow, Lines} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {stay} from '../content';
import {useReveals} from '../hooks/useReveals';
import {to} from '../lib/media';

export default function Stay() {
  const {hero} = stay;
  return (
    <>
      <PageHero slides={[{name: hero.image, alt: hero.alt}]} eyebrow={hero.eyebrow} lines={hero.lines} body={hero.body} />
      <Facts />
      <Rooms />
      <Amenities />
      <GoodToKnow />
      <BookBand
        title={[{t: 'Two rooms,'}, {t: 'one sea breeze.', i: true}]}
        text="Sleeps four in two en-suite bedrooms. Check live availability and book directly with us online."
      />
    </>
  );
}

function Facts() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-label="At a glance" className="bg-paper px-5 pt-20 text-ink md:px-14 md:pt-28">
      <dl className="mx-auto grid max-w-[1680px] grid-cols-2 gap-px bg-ink/15 sm:grid-cols-3 lg:grid-cols-6">
        {stay.facts.map(([k, v], i) => (
          <div key={k} data-reveal style={{'--d': `${i * 0.06}s`} as CSSProperties} className="bg-paper py-6 pr-4">
            <dt className="caps text-ink/70">{k}</dt>
            <dd className="display mt-2 text-[clamp(26px,2.2vw,36px)]">{v}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Alternating photo / text rows, one per room. */
function Rooms() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="rooms" aria-label="The rooms" className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto max-w-[1680px] space-y-24 md:space-y-36">
        {stay.rooms.map((r, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={r.name} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              <div data-reveal className={`overflow-hidden md:col-span-7 ${flip ? 'md:order-2 md:col-start-6' : ''}`}>
                <Img name={r.name} alt={r.alt} sizes="(min-width: 768px) 58vw, 100vw" className="aspect-[16/10] w-full object-cover" />
              </div>
              <div data-reveal style={{'--d': '0.12s'} as CSSProperties} className={`md:col-span-4 ${flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9'}`}>
                <Eyebrow className="text-cobalt">{`0${i + 1} — ${r.kicker}`}</Eyebrow>
                <h2 className="display mt-4 text-[clamp(38px,3.8vw,68px)]">
                  <Lines lines={r.title} />
                </h2>
                <p className="copy mt-6 max-w-[48ch] text-ink/80">{r.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function Amenities() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="amenities-title" className="bg-ink px-5 py-24 text-paper md:px-14 md:py-32">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="amenities-title" data-reveal className="display text-[clamp(44px,5.4vw,96px)] md:col-span-7">
            <span className="block">Everything</span>
            <span className="it block">you’ll need</span>
          </h2>
          <p data-reveal className="copy max-w-[48ch] text-paper/80 md:col-span-4 md:col-start-9">
            Linen, towels and toiletries are provided, the kitchen is stocked with the basics, and the Wi-Fi is free.
          </p>
        </div>
        <ul className="mt-14 grid grid-cols-1 gap-px bg-paper/15 min-[420px]:grid-cols-2 md:grid-cols-4">
          {stay.amenities.map((a, i) => (
            <li key={a.label} data-reveal style={{'--d': `${(i % 4) * 0.05}s`} as CSSProperties} className="flex items-center gap-4 bg-ink py-5 pr-4">
              <Icon name={a.icon} className="size-6 text-daisy" />
              <span className="copy text-[16px]">{a.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GoodToKnow() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="rules-title" className="bg-shell px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow className="text-cobalt">House notes</Eyebrow>
          <h2 id="rules-title" data-reveal className="display mt-4 text-[clamp(44px,4.8vw,84px)]">
            <span className="block">Good</span>
            <span className="it block">to know</span>
          </h2>
          <a href={to('gallery.html')} className="caps group mt-10 inline-flex min-h-12 items-center gap-3 border border-ink/40 px-6 py-3 transition-colors hover:bg-ink hover:text-paper">
            See all photos <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <dl className="divide-y divide-ink/15 border-y border-ink/15">
            {stay.rules.map(([k, v]) => (
              <div key={k} data-reveal className="grid gap-1 py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                <dt className="caps pt-1 text-ink/70">{k}</dt>
                <dd className="copy">{v}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-10 space-y-4">
            {stay.notes.map((n) => (
              <li key={n} data-reveal className="copy flex gap-4 text-ink/80">
                <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-cobalt" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
