import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {BookBand} from '../components/BookBand';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow, Lines} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {home} from '../content';
import {useReveals} from '../hooks/useReveals';
import {to} from '../lib/media';

export default function Home() {
  return (
    <>
      <PageHero full slides={home.hero.slides} lines={home.hero.lines} body={home.hero.body} />
      <Panels />
      <Intro />
      <Quote />
      <BookBand />
    </>
  );
}

/**
 * Three tall panels slide in from the right one after another, each showing
 * its own third of ONE photo of the coast — so together they read as a single
 * picture. Each panel opens a page: the stay, the village, the guests.
 */
function Panels() {
  const root = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const {image, alt, items} = home.panels;

  useEffect(() => {
    const el = root.current!;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      {threshold: 0.2},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} aria-labelledby="discover-title" className="relative bg-ink">
      <h2 id="discover-title" className="sr-only">
        Discover Bokkoms
      </h2>
      <div className="grid h-svh min-h-[620px] grid-cols-3 gap-[3px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {items.map((b, i) => (
          <a
            key={b.id}
            href={to(b.href)}
            className={`group relative block overflow-hidden transition-transform duration-[1100ms] ease-wipe motion-reduce:transition-none max-md:h-[78svh] max-md:min-h-[480px] ${
              shown ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
            }`}
            style={{transitionDelay: `${0.12 + i * 0.16}s`, background: b.tint} as CSSProperties}
          >
            {/* One slice of the shared photo: three panels (and two 3px gaps) wide, shifted per panel. */}
            <div className="absolute top-0 h-full" style={{width: 'calc(300% + 6px)', left: `calc(${-100 * i}% - ${3 * i}px)`}}>
              <Img name={image} alt={i === 0 ? alt : ''} sizes="100vw" className="kb-single h-full w-full object-cover object-[50%_30%]" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_26_34/0.6),transparent_40%,rgb(14_26_34/0.5))] transition-colors duration-700 group-hover:bg-ink/25" />
            <div className="relative flex h-full flex-col justify-between p-7 pt-28 md:p-9 md:pt-32">
              <div>
                <h3 className="display text-[clamp(38px,3.6vw,64px)] text-paper">
                  <span className="block">{b.title[0]}</span>
                  <span className="it block">{b.title[1]}</span>
                </h3>
                <dl className={`mt-6 space-y-3 transition-opacity delay-[1400ms] duration-700 motion-reduce:delay-0 ${shown ? 'opacity-100' : 'opacity-0'}`}>
                  {b.specs.map(([k, v]) => (
                    <div key={k}>
                      <dt className="caps text-paper/75">{k}</dt>
                      <dd className="caps text-[14px] text-paper">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="caps inline-flex items-center gap-3 self-start text-paper">
                <span className="draw">Discover</span>
                <Icon name="arrowRight" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  const ref = useReveals<HTMLElement>();
  const {intro, stats, duo} = home;
  return (
    <section ref={ref} className="bg-paper px-5 py-24 text-ink md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow className="text-cobalt" >{intro.eyebrow}</Eyebrow>
          <h2 data-reveal className="display mt-5 text-[clamp(44px,5.4vw,96px)]">
            <Lines lines={intro.title} />
          </h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal className="lede">
            {intro.lede}
          </p>
          <p data-reveal className="copy mt-6 max-w-[60ch] text-ink/80">
            {intro.body}
          </p>
          <dl className="mt-12 grid grid-cols-2 gap-px bg-ink/15 sm:grid-cols-4">
            {stats.map(([v, k], i) => (
              <div key={k} data-reveal style={{'--d': `${i * 0.08}s`} as CSSProperties} className="flex flex-col-reverse bg-paper py-5 pr-4">
                <dt className="caps mt-2 text-ink/70">{k}</dt>
                <dd className="display text-[clamp(36px,3.4vw,52px)] text-cobalt">{v}</dd>
              </div>
            ))}
          </dl>
          <a href={to('stay.html')} className="caps group mt-10 inline-flex min-h-12 items-center gap-3 bg-ink px-7 py-3 text-paper transition-colors hover:bg-cobalt">
            See the stay <Icon name="arrowRight" className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-24 grid max-w-[1680px] gap-5 md:mt-32 md:grid-cols-12">
        {duo.map((d, i) => (
          <figure key={d.name} data-reveal style={{'--d': `${i * 0.12}s`} as CSSProperties} className={i === 0 ? 'md:col-span-7' : 'md:col-span-4 md:col-start-9 md:mt-32'}>
            <div className="overflow-hidden">
              <Img name={d.name} alt={d.alt} sizes="(min-width: 768px) 55vw, 100vw" className={`w-full object-cover ${i === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'}`} />
            </div>
            <figcaption className="caps mt-3 text-ink/70">{d.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Quote() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="bg-ink px-5 py-24 text-paper md:px-14 md:py-36">
      <figure className="mx-auto max-w-[1280px]">
        <Icon name="star" className="size-6 text-daisy" />
        <blockquote data-reveal className="display it mt-8 text-[clamp(34px,4.4vw,76px)] normal-case">
          “{home.quote.text}”
        </blockquote>
        <figcaption data-reveal className="caps mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-paper/75">
          <span>— {home.quote.by}, on Booking.com</span>
          <a href={to('reviews.html')} className="draw text-daisy">
            Read more reviews
          </a>
        </figcaption>
      </figure>
    </section>
  );
}
