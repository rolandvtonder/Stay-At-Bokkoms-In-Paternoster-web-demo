import type {Line} from '../content';

/** Headline lines from content.ts; lines marked `i` are set in italic. */
export function Lines({lines, indentFirst = false}: {lines: Line[]; indentFirst?: boolean}) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l.t} className={`block ${l.i ? 'it' : ''} ${indentFirst && i === 0 ? 'pl-[1.6em] max-sm:pl-[0.8em]' : ''}`}>
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
