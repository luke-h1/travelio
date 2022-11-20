import cn from 'classnames';
import * as React from 'react';
import { HTMLAttributes } from 'react';
import hash from 'string-hash';
import color from 'tinycolor2';
import styles from './Avatar.module.scss';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string;
  size?: 'small' | 'large';
}

function getInitials(name: string) {
  const [firstName, lastName] = name.split(' ');
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

function Fallback({
  name,
  width,
  height,
}: {
  name: string;
  width: number;
  height: number;
}) {
  const parsedName = name.replace(/\s/g, '');
  const n = hash(parsedName);
  const c = color({ h: n % 360, s: 0.95, l: 0.5 });
  const c1 = c.toHexString();
  const c2 = c.triad()[1].toHexString();
  return (
    <svg
      role="img"
      aria-label={name}
      width={width}
      height={height}
      style={{ borderRadius: 9999 }}
      viewBox="0 0 80 80"
    >
      <defs>
        <linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id={parsedName}>
          <stop stopColor={c1} offset="0%" />
          <stop stopColor={c2} offset="100%" />
        </linearGradient>
      </defs>
      <g stroke="none" strokeWidth="1" fill="none">
        <rect
          fill={`url(#${parsedName})`}
          x="0"
          y="0"
          width="100%"
          height="100%"
        />
      </g>
    </svg>
  );
}

export function AvatarFallback() {
  return (
    <div className={styles.example}>
      <Fallback name="ME" width={40} height={40} />
    </div>
  );
}

export default function Avatar({
  name,
  src,
  size = 'small',
  className,
  ...rest
}: AvatarProps) {
  return (
    <div
      className={cn(
        styles.wrapper,
        {
          [styles.large]: size === 'large',
          [styles.small]: size === 'small',
        },
        className,
      )}
      {...rest}
    >
      <img src={src || 'blur.png'} alt={name} />
      {name && !src && <p className={styles.initials}>{getInitials(name)}</p>}
    </div>
  );
}
