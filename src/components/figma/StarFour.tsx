import React from 'react';
import { cn } from '../lib/utils';

type Format = 'Outline' | 'Stroke';
type Weight = 'Bold' | 'Duotone' | 'Fill' | 'Light' | 'Regular' | 'Thin';

interface StarFourProps {
  /** Outline (stroke only) or Stroke (fill only) */
  format: Format;
  /** Weight of the icon */
  weight: Weight;
  /** Optional label for accessibility */
  label?: string;
  /** Optional click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Disabled state */
  disabled?: boolean;
}

/** Map weight to its default color token */
const weightToColor: Record<Weight, string> = {
  Thin: '--color-content-muted',
  Light: '--color-content',
  Regular: '--color-content',
  Bold: '--color-primary',
  Duotone: '--color-success',
  Fill: '--color-primary',
};

/** Map weight to its hover color token (falls back to default if no hover token defined) */
const weightToHoverColor: Record<Weight, string> = {
  Thin: '--color-content-muted',
  Light: '--color-content',
  Regular: '--color-content',
  Bold: '--color-primary-hover',
  Duotone: '--color-success', // no specific hover token, use default
  Fill: '--color-primary-hover',
};

export default function StarFour({
  format,
  weight,
  label = 'Star',
  onClick,
  disabled = false,
}: StarFourProps) {
  const isOutline = format === 'Outline';

  // Determine color tokens based on disabled state
  const baseColorToken = disabled
    ? '--color-content-muted'
    : weightToColor[weight];
  const hoverColorToken = disabled
    ? '--color-content-muted'
    : weightToHoverColor[weight];

  // Compute stroke and fill values
  const stroke = isOutline ? `var(${baseColorToken})` : 'none';
  const fill = !isOutline ? `var(${baseColorToken})` : 'none';
  const strokeHover = isOutline ? `var(${hoverColorToken})` : 'none';
  const fillHover = !isOutline ? `var(${hoverColorToken})` : 'none';

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        `stroke-[${stroke}]`,
        `fill-[${fill}]`,
        `hover:stroke-[${strokeHover}]`,
        `hover:fill-[${fillHover}]`,
        'focus-visible:outline-none',
        'focus-visible:ring-[var(--space-1)]',
        'focus-visible:ring-offset-[var(--space-1)]',
        'focus-visible:ring-[var(--color-focus-ring)]',
        'disabled:opacity-50',
        'cursor-pointer',
        !disabled && 'cursor-pointer',
        disabled && 'cursor-not-allowed'
      )}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        strokeWidth="var(--space-1)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12,2 22,12 12,22 2,12" />
      </svg>
    </button>
  );
}