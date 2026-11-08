import type {Line} from '../content';

/**
 * The big headings are designed for a few short words (about 40 letters).
 * When one is written longer on the editing page, its letters shrink in step
 * (never below half size) so the heading keeps roughly the same footprint
 * instead of filling the whole screen.
 */
const ROOM = 40;
const fit = (lines: Line[]) => {
  const letters = lines.reduce((n, l) => n + l.t.length, 0);
  return letters > ROOM ? Math.max(0.5, Math.sqrt(ROOM / letters)) : 1;
};

/** Headline lines from content.ts; lines marked `i` are set in italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  const k = fit(lines);
  return (
    <>
      {lines.map((l, i) => (
        <span
          key={i}
          className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'pl-[1.6em] max-sm:pl-[0.8em]' : ''}`}
          style={k < 1 ? {fontSize: `${k.toFixed(3)}em`} : undefined}
        >
          {l.t}
        </span>
      ))}
    </>
  );
}

/** Small numbered label above a heading, e.g. "02 — The Stay". */
export function Eyebrow({children, className = ''}: {children: string; className?: string}) {
  return <p className={`caps ${className}`}>{children}</p>;
}
