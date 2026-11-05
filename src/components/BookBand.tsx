import type {CSSProperties} from 'react';
import {site, type Line} from '../content';
import {useReveals} from '../hooks/useReveals';
import {Icon} from './Icon';
import {Lines} from './Lines';

const defaultTitle: Line[] = [{t: 'Your West Coast'}, {t: 'escape is waiting.', i: true}];

/** The cobalt "book now" band that closes most pages. */
export function BookBand({title = defaultTitle, text}: {title?: Line[]; text?: string}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="bg-cobalt px-5 py-24 text-paper md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-10 md:grid-cols-12 md:items-end">
        <h2 data-reveal className="display text-[clamp(44px,6vw,104px)] md:col-span-7">
          <Lines lines={title} />
        </h2>
        <div data-reveal style={{'--d': '0.15s'} as CSSProperties} className="md:col-span-5">
          <p className="copy max-w-[46ch] text-paper/90">
            {text ?? 'Message us on WhatsApp to check dates and book directly, or reserve online through Booking.com.'}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.whatsapp} target="_blank" rel="noopener" className="caps inline-flex min-h-12 items-center gap-3 bg-daisy px-7 py-3 text-ink transition-colors hover:bg-paper">
              <Icon name="chat" className="size-4" />
              WhatsApp us
            </a>
            <a
              href={site.booking}
              target="_blank"
              rel="noopener"
              className="caps inline-flex min-h-12 items-center gap-3 border border-paper/60 px-7 py-3 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
            >
              Booking.com
              <Icon name="arrowUpRight" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
