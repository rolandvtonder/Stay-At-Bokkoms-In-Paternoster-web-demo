import {useEffect, useRef, useState, type CSSProperties, type FormEvent} from 'react';
import {Icon} from '../components/Icon';
import {Img} from '../components/Img';
import {Eyebrow} from '../components/Lines';
import {PageHero} from '../components/PageHero';
import {contact, site, stay} from '../content';
import {useReveals} from '../hooks/useReveals';

export default function Contact() {
  const {hero} = contact;
  return (
    <>
      <PageHero slides={[{name: hero.image, alt: hero.alt}]} eyebrow={hero.eyebrow} lines={hero.lines} body={hero.body} />
      <Ways />
      <Enquiry />
      <FindUs />
    </>
  );
}

/** The three ways to book, direct online booking first. */
function Ways() {
  const ref = useReveals<HTMLElement>();
  const card = 'group flex min-h-[260px] flex-col justify-between p-8 transition-colors md:p-10';
  return (
    <section ref={ref} aria-label="Ways to book" className="bg-paper px-5 py-20 text-ink md:px-14 md:py-28">
      <div className="mx-auto grid max-w-[1680px] gap-4 md:grid-cols-3">
        <a data-reveal href={site.book} target="_blank" rel="noopener" className={`${card} bg-cobalt text-paper hover:bg-ink`}>
          <Icon name="calendar" className="size-8 text-daisy" />
          <div>
            <p className="caps text-paper/80">Book direct with us</p>
            <p className="display mt-2 text-[clamp(36px,3.2vw,52px)]">
              Book <span className="it">online</span>
            </p>
            <p className="copy mt-2 text-paper/85">See live availability and prices.</p>
          </div>
        </a>
        <a data-reveal style={{'--d': '0.08s'} as CSSProperties} href={site.whatsapp} target="_blank" rel="noopener" className={`${card} bg-shell hover:bg-sky`}>
          <Icon name="chat" className="size-8 text-cobalt" />
          <div>
            <p className="caps text-ink/70">Questions · special requests</p>
            <p className="display mt-2 text-[clamp(36px,3.2vw,52px)]">
              WhatsApp <span className="it">us</span>
            </p>
            <p className="copy mt-2 text-ink/80">{site.phone}</p>
          </div>
        </a>
        <div data-reveal style={{'--d': '0.16s'} as CSSProperties} className={`${card} bg-shell`}>
          <Icon name="phone" className="size-8 text-cobalt" />
          <div>
            <p className="caps text-ink/70">Call or email</p>
            <a href={site.phoneHref} className="display draw mt-2 inline-block text-[clamp(32px,2.8vw,46px)]">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="copy draw mt-2 block text-[15px] text-ink/80 [overflow-wrap:anywhere]">
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

type Errors = Partial<Record<'checkin' | 'checkout' | 'name', string>>;

const today = () => new Date().toISOString().slice(0, 10);
const nice = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString('en-ZA', {weekday: 'short', day: 'numeric', month: 'long', year: 'numeric'});

/**
 * An enquiry form that needs no server: it writes the guest's details into a
 * WhatsApp message (or an email) for them to send themselves.
 */
function Enquiry() {
  const ref = useReveals<HTMLElement>();
  const summary = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [via, setVia] = useState<'whatsapp' | 'email'>('whatsapp');
  // Bumped on every failed send, so the error summary takes focus once it has rendered.
  const [failed, setFailed] = useState(0);
  useEffect(() => {
    if (failed) summary.current?.focus();
  }, [failed]);

  const validate = (f: FormData): Errors => {
    const e: Errors = {};
    const ci = String(f.get('checkin') || '');
    const co = String(f.get('checkout') || '');
    if (!ci) e.checkin = 'Choose your check-in date.';
    else if (ci < today()) e.checkin = 'Check-in can’t be in the past.';
    if (!co) e.checkout = 'Choose your check-out date.';
    else if (ci && co <= ci) e.checkout = 'Check-out must be after check-in.';
    if (!String(f.get('name') || '').trim()) e.name = 'Tell us your name.';
    return e;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const e = validate(f);
    setErrors(e);
    if (Object.keys(e).length) {
      setFailed((n) => n + 1);
      return;
    }
    const lines = [
      `Hello Alvin & Amanda, I'd like to book a stay at Bokkoms.`,
      `Check-in: ${nice(String(f.get('checkin')))}`,
      `Check-out: ${nice(String(f.get('checkout')))}`,
      `Guests: ${f.get('guests')}`,
      f.get('pet') ? 'We would like to bring a pet.' : '',
      String(f.get('message') || '').trim(),
      `— ${String(f.get('name')).trim()}`,
    ].filter(Boolean);
    const text = lines.join('\n');
    if (via === 'whatsapp') window.open(`${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    else location.href = `mailto:${site.email}?subject=${encodeURIComponent('Booking enquiry — Stay at Bokkoms')}&body=${encodeURIComponent(text)}`;
  };

  const field = 'copy mt-2 block min-h-12 w-full border border-ink/25 bg-paper px-4 py-3 text-[16px] text-ink transition-colors focus:border-cobalt focus:outline-none focus-visible:outline-2 focus-visible:outline-cobalt aria-[invalid=true]:border-[#b3261e]';
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="copy mt-2 text-[15px] text-[#b3261e]">
        {errors[k]}
      </p>
    ) : null;
  const list = Object.entries(errors);

  return (
    <section ref={ref} aria-labelledby="enquiry-title" className="bg-shell px-5 py-24 text-ink md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Eyebrow className="text-cobalt">Check your dates</Eyebrow>
          <h2 id="enquiry-title" data-reveal className="display mt-4 text-[clamp(44px,4.8vw,84px)]">
            <span className="block">Send an</span>
            <span className="it block">enquiry</span>
          </h2>
          <p data-reveal className="copy mt-6 max-w-[40ch] text-ink/80">
            Fill this in and we’ll turn it into a message for you to send on WhatsApp or by email. Nothing is sent until you press send there.
          </p>
          <ul className="mt-8 space-y-2">
            {stay.rules.slice(0, 2).map(([k, v]) => (
              <li key={k} className="copy flex gap-3 text-[15px] text-ink/80">
                <Icon name="clock" className="mt-1 size-4 text-cobalt" />
                <span>
                  <strong className="font-normal text-ink">{k}:</strong> {v}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="md:col-span-7 md:col-start-6">
          {list.length > 0 && (
            <div ref={summary} tabIndex={-1} role="alert" className="mb-8 border-l-4 border-[#b3261e] bg-paper p-5 outline-none">
              <p className="caps text-[#b3261e]">Please check {list.length === 1 ? 'one thing' : `${list.length} things`}</p>
              <ul className="copy mt-2 text-[15px]">
                {list.map(([k, m]) => (
                  <li key={k}>
                    <a href={`#${k}`} className="underline">
                      {m}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="checkin" className="caps">
                Check-in <span aria-hidden className="text-cobalt">*</span>
              </label>
              <input id="checkin" name="checkin" type="date" required min={today()} className={field} aria-invalid={!!errors.checkin} aria-describedby={errors.checkin ? 'checkin-error' : undefined} />
              {err('checkin')}
            </div>
            <div>
              <label htmlFor="checkout" className="caps">
                Check-out <span aria-hidden className="text-cobalt">*</span>
              </label>
              <input id="checkout" name="checkout" type="date" required min={today()} className={field} aria-invalid={!!errors.checkout} aria-describedby={errors.checkout ? 'checkout-error' : undefined} />
              {err('checkout')}
            </div>
            <div>
              <label htmlFor="guests" className="caps">
                Guests
              </label>
              <select id="guests" name="guests" defaultValue="2" className={field}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
              <p className="copy mt-2 text-[14px] text-ink/70">The flat sleeps up to four.</p>
            </div>
            <div>
              <label htmlFor="name" className="caps">
                Your name <span aria-hidden className="text-cobalt">*</span>
              </label>
              <input id="name" name="name" type="text" autoComplete="name" required className={field} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />
              {err('name')}
            </div>
            <div className="sm:col-span-2">
              <label className="copy flex min-h-11 cursor-pointer items-center gap-3 text-[16px]">
                <input type="checkbox" name="pet" className="size-5 accent-cobalt" />
                We’d like to bring a pet (by prior arrangement, no extra charge)
              </label>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="caps">
                Anything else? <span className="normal-case tracking-normal text-ink/60">(optional)</span>
              </label>
              <textarea id="message" name="message" rows={4} className={`${field} resize-y`} />
            </div>
          </div>
          <p className="caps mt-6 text-ink/60">
            <span aria-hidden className="text-cobalt">*</span> Required
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="submit" onClick={() => setVia('whatsapp')} className="caps inline-flex min-h-12 cursor-pointer items-center gap-3 bg-cobalt px-7 py-3 text-paper transition-colors hover:bg-ink">
              <Icon name="chat" className="size-4" /> Send on WhatsApp
            </button>
            <button type="submit" onClick={() => setVia('email')} className="caps inline-flex min-h-12 cursor-pointer items-center gap-3 border border-ink/40 px-7 py-3 transition-colors hover:bg-ink hover:text-paper">
              <Icon name="mail" className="size-4" /> Send by email
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function FindUs() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} aria-labelledby="find-title" className="bg-ink px-5 py-24 text-paper md:px-14 md:py-32">
      <div className="mx-auto grid max-w-[1680px] gap-12 md:grid-cols-12 md:items-center">
        <div data-reveal className="overflow-hidden md:col-span-6">
          <Img name="gate" alt="The front gate of Bokkoms with its wooden garage door and whitewashed walls" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover" />
        </div>
        <div className="md:col-span-5 md:col-start-8">
          <Eyebrow className="text-paper/75">Find us</Eyebrow>
          <h2 id="find-title" data-reveal className="display mt-4 text-[clamp(44px,4.8vw,84px)]">
            <span className="block">In Bekbaai,</span>
            <span className="it block">Paternoster</span>
          </h2>
          <address data-reveal className="lede mt-8 not-italic">
            {site.address.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </address>
          <p data-reveal className="copy mt-6 max-w-[48ch] text-paper/80">
            About two hours’ drive north of Cape Town on the R27. Free private parking on site. We speak Afrikaans, English and Dutch.
          </p>
          <a href={site.maps} target="_blank" rel="noopener" className="caps mt-8 inline-flex min-h-12 items-center gap-3 bg-daisy px-7 py-3 text-ink transition-colors hover:bg-paper">
            <Icon name="pin" className="size-4" /> Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
