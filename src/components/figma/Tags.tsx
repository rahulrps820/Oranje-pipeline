import { cn } from '../../lib/utils';
import React from 'react';

export interface TagsProps {
  /** Size of the tag */
  size: 'Medium' | 'Small';
  /** Interaction state */
  state: 'Default' | 'Disabled' | 'Focussed' | 'Hover' | 'Pressed';
  /** Whether the tag is selected */
  selected: boolean;
  /** Shape style */
  style: 'Rectangle' | 'Rounded';
  /** Optional children */
  children?: React.ReactNode;
  /** Additional class names */
  className?: string;
}

export default function Tags({
  size,
  state,
  selected,
  style,
  children,
  className,
}: TagsProps) {
  const disabled = state === 'Disabled';

  // Base classes shared across variants
  const baseClasses = cn(
    'inline-flex items-center gap-1.5 font-medium transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--color-border)] focus-visible:ring-offset-[var(--color-background)]',
    disabled ? 'pointer-events-none opacity-50' : ''
  );

  // Size variants
  const sizeClasses =
    size === 'Medium' ? 'text-base px-3 py-2' : 'text-sm px-2 py-1';

  // Style variants
  const styleClasses =
    style === 'Rectangle'
      ? 'rounded-none'
      : `rounded-[var(--radius-medium)]`;

  // Color variants based on selected state
  const getColorClasses = () => {
    if (selected) {
      return cn(
        'bg-foreground',
        'text-foreground-foreground',
        'border-border-foreground'
      );
    }
    return cn(
      'bg-muted',
      'text-muted-foreground',
      'border-border'
    );
  };

  // State-based overlays (hover, focussed, pressed)
  // We use Tailwind's state variants directly on the color classes
  const stateClasses = cn(
    {
      // Default: no extra
      Default: '',
      // Disabled: the base classes already apply `pointer-events-none opacity-50`, so there is no
      // extra state styling — but the entry must EXIST. `state` has five values and this map had
      // four, so indexing it with 'Disabled' spliced `undefined` into the className.
      Disabled: '',
      // Hover: increase background intensity slightly
      Hover: 'hover:bg-muted/80 hover:bg-foreground/90',
      // Focussed: already covered by focus-visible ring; subtle bg change
      Focussed: 'focus:bg-muted/70 focus:bg-foreground/85',
      // Pressed: darker background
      Pressed: 'active:bg-muted/60 active:bg-foreground/80'
    }[state]
  );

  const colorClasses = cn(getColorClasses(), stateClasses);

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(baseClasses, sizeClasses, styleClasses, colorClasses, className)}
    >
      {children ?? 'Tag'}
    </button>
  );
}