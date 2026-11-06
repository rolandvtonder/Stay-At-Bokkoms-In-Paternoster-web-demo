import {pages, site, socials} from '../content';
import {useFitText} from '../hooks/useFitText';
import {to} from '../lib/media';
import {Icon} from './Icon';

export function Footer() {
  const word = useFitText<HTMLSpanElement>();
  return (
    <footer className="bg-ink px-5 pt-20 pb-28 text-paper md:px-14">
      <div className="mx-auto grid max-w-[1680px] gap-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="caps text-paper/60">Find us</p>
          <address className="copy mt-3 not-italic">
            {site.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <a href={site.maps} target="_blank" rel="noopener" className="caps draw mt-3 inline-flex items-center gap-2 py-2">
            <Icon name="pin" className="size-4" /> Open in Google Maps
          </a>
        </div>
        <div>
          <p className="caps text-paper/60">Talk to us</p>
          <ul className="copy mt-3 space-y-1">
            <li>
              <a href={site.whatsapp} target="_blank" rel="noopener" className="draw inline-flex items-center gap-3 py-1">
                <Icon name="chat" className="size-4" /> WhatsApp {site.phone}
              </a>
            </li>
            <li>
              <a href={site.phoneHref} className="draw inline-flex items-center gap-3 py-1">
                <Icon name="phone" className="size-4" /> Call {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="draw inline-flex items-center gap-3 py-1 text-[15px] [overflow-wrap:anywhere]">
                <Icon name="mail" className="size-4" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="caps text-paper/60">Pages</p>
          <ul className="mt-3">
            {pages.map((p) => (
              <li key={p.id}>
                <a href={to(p.href)} className="copy draw inline-block py-1">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="caps text-paper/60">Elsewhere</p>
          <ul className="copy mt-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="draw inline-flex items-center gap-2 py-1">
                  {s.label} <Icon name="arrowUpRight" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-[1680px] overflow-hidden" aria-hidden>
        <span ref={word} className="display inline-block whitespace-nowrap leading-[0.8] tracking-[0.04em] text-paper/90">
          {site.short}
        </span>
      </div>

      <div className="caps mx-auto mt-6 flex max-w-[1680px] flex-wrap justify-between gap-x-8 gap-y-3 text-paper/60">
        <p>© {new Date().getFullYear()} {site.name} in {site.place} · Self-catering guest flat · West Coast, South Africa</p>
        <p>
          Website by{' '}
          <a href={site.credit.href} target="_blank" rel="noopener" className="draw text-paper/85 hover:text-paper">
            {site.credit.label}
          </a>
        </p>
      </div>
    </footer>
  );
}
