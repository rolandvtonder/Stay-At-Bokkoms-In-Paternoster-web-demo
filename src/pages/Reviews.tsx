import type {CSSProperties} from 'react';
import {BookBand} from '../components/BookBand';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow, Lines} from '../components/Lines';
import {reviews} from '../content';
import {useReveals} from '../hooks/useReveals';

export default function Reviews() {
  return (
    <>
      <Header />
      <Quotes />
      <Hosts />
      <BookBand title={[{t: 'Come and see'}, {t: 'for yourself.', i: true}]} />
    </>
  );
}

function Header() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="bg-ink px-5 pt-36 pb-24 text-paper md:px-14 md:pt-44 md:pb-32">
      <div className="mx-auto grid max-w-[1680px] gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Eyebrow className="text-paper/75">{reviews.eyebrow}</Eyebrow>
          <h1 className="display mt-6 text-[clamp(52px,7.4vw,140px)]">
            <Lines lines={reviews.title} />
          </h1>
        </div>
        <div className="md:col-span-5 md:pt-10">
          <p data-reveal className="display text-[clamp(110px,14vw,240px)] leading-[0.8] text-daisy">
            {reviews.score}
          </p>
          <p data-reveal className="caps mt-4 text-paper/80">
            {reviews.scoreLabel}
          </p>
          <p data-reveal className="mt-6 inline-flex items-center gap-3 border border-paper/30 px-4 py-3">
            <Icon name="star" className="size-5 text-daisy" />
            <span className="caps">
              <strong className="font-normal text-paper">{reviews.award.score}</strong> · {reviews.award.text}
            </span>
          </p>
          <dl className="mt-10 space-y-4">
            {reviews.categories.map(([k, v], i) => (
              <div key={k} data-reveal style={{'--d': `${i * 0.05}s`} as CSSProperties}>
                <div className="flex justify-between">
                  <dt className="caps text-paper/80">{k}</dt>
                  <dd className="caps tabular-nums text-paper">{v.toFixed(1)}</dd>
                </div>
                <div aria-hidden className="mt-1.5 h-[3px] bg-paper/15">
                  <div className="h-full bg-sky" style={{width: `${v * 10}%`}} />
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Quotes() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="quotes-title" className="bg-paper px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto max-w-[1680px]">
        <h2 id="quotes-title" className="caps text-cobalt">
          What guests loved most
        </h2>
        <ul className="mt-10 columns-1 gap-6 md:columns-2 xl:columns-3">
          {reviews.quotes.map((q, i) => (
            <li key={q.by} data-reveal style={{'--d': `${(i % 3) * 0.06}s`} as CSSProperties} className="mb-6 break-inside-avoid">
              <figure className={`p-8 ${i % 4 === 0 ? 'bg-cobalt text-paper' : 'bg-shell'}`}>
                <blockquote className={i % 4 === 0 ? 'display it text-[clamp(28px,2.4vw,38px)] normal-case leading-[1.05]' : 'copy'}>“{q.text}”</blockquote>
                <figcaption className={`caps mt-6 ${i % 4 === 0 ? 'text-paper/80' : 'text-ink/70'}`}>
                  {q.by} · {q.from}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Hosts() {
  const ref = useReveals<HTMLElement>();
  const {hosts, guestbook} = reviews;
  return (
    <section ref={ref} aria-labelledby="hosts-title" className="bg-shell px-5 py-24 text-ink md:px-14 md:py-36">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div data-reveal className="overflow-hidden">
            <Img name={hosts.image} alt={hosts.imageAlt} sizes="(min-width: 768px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:pt-16">
          <Eyebrow className="text-cobalt">{hosts.eyebrow}</Eyebrow>
          <h2 id="hosts-title" data-reveal className="display mt-4 text-[clamp(48px,5.8vw,104px)]">
            <Lines lines={hosts.title} />
          </h2>
          <p data-reveal className="lede mt-8">
            {hosts.lede}
          </p>
          {hosts.body.map((b) => (
            <p key={b} data-reveal className="copy mt-5 max-w-[60ch] text-ink/80">
              {b}
            </p>
          ))}
          <figure data-reveal className="mt-14 grid items-end gap-5 sm:grid-cols-[220px_1fr]">
            <Img name={guestbook.image} alt={guestbook.alt} sizes="220px" className="w-full -rotate-2 shadow-[0_20px_50px_rgb(14_26_34/0.2)]" />
            <figcaption className="caps text-ink/70">{guestbook.caption}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
