import {site, type PageId} from '../content';
import {media, to} from '../lib/media';

/**
 * The fixed pieces that sit over every page: the logo top-left, the menu
 * button top-right and the "Book your stay" box bottom-right.
 */
export function Brand() {
  return (
    <>
      {/* The badge is the Facebook profile photo — the white gable of the house. */}
      <a href={to('')} tabIndex={-1} aria-hidden className="fixed top-4 left-4 z-[55] md:top-6 md:left-10">
        <img src={media('logo.webp')} alt="" width={44} height={44} className="size-11 rounded-full object-cover ring-2 ring-paper/85" />
      </a>
      {/* Wordmark in white with difference blending, so it reads on photos and on paper alike. */}
      <a
        href={to('')}
        aria-label={`${site.name} in ${site.place} — home`}
        className="fixed top-[17px] left-[70px] z-[55] text-white mix-blend-difference md:top-[25px] md:left-[96px]"
      >
        <span className="caps block text-[10px] leading-none tracking-[0.3em]">Stay at</span>
        <span className="display block text-[25px] tracking-[0.16em]">{site.short}</span>
      </a>
    </>
  );
}

export function MenuButton({open, onToggle}: {open: boolean; onToggle: () => void}) {
  return (
    <button
      id="menu-button"
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="site-menu"
      className={`caps fixed top-4 right-4 z-[55] flex min-h-11 cursor-pointer items-center gap-4 px-6 py-3 backdrop-blur-md transition-colors duration-500 md:top-6 md:right-8 ${
        open ? 'bg-paper text-ink' : 'bg-ink/55 text-paper hover:bg-ink/80'
      }`}
    >
      {open ? 'Close' : 'Menu'}
      <span aria-hidden className={`text-[18px] leading-none transition-transform duration-500 ease-silk ${open ? 'rotate-45' : ''}`}>
        +
      </span>
    </button>
  );
}

export function BookCta({page, menuOpen}: {page: PageId; menuOpen: boolean}) {
  // On the booking page itself the box becomes a direct line to WhatsApp.
  const onContact = page === 'contact';
  return (
    <a
      href={onContact ? site.whatsapp : to('contact.html')}
      target={onContact ? '_blank' : undefined}
      rel={onContact ? 'noopener' : undefined}
      className={`caps fixed right-4 bottom-4 z-[55] px-7 py-4 shadow-[0_10px_40px_rgb(14_26_34/0.25)] transition-colors duration-500 md:right-8 md:bottom-6 md:px-8 ${
        menuOpen ? 'bg-sky text-ink' : 'bg-daisy text-ink hover:bg-paper'
      }`}
    >
      {onContact ? (
        <>
          WhatsApp <em className="normal-case">us</em>
        </>
      ) : (
        <>
          Book your <em className="normal-case">stay</em>
        </>
      )}
    </a>
  );
}
