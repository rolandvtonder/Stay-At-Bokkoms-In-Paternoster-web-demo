import type {CSSProperties} from 'react';
import {dims, media, type MediaName} from '../lib/media';

/**
 * A photo from public/media with its small and full sizes in srcset, and its
 * real width/height so the browser reserves the space before it loads.
 */
export function Img({
  name,
  alt,
  className,
  sizes = '100vw',
  eager = false,
  style,
}: {
  name: MediaName;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
  style?: CSSProperties;
}) {
  const {w, h} = dims(name);
  return (
    <img
      src={media(`${name}.webp`)}
      srcSet={`${media(`${name}-sm.webp`)} ${Math.min(640, w)}w, ${media(`${name}.webp`)} ${w}w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={style}
    />
  );
}
