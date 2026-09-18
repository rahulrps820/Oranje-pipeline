import React, { useState, useRef, KeyboardEvent } from 'react';

interface PillProps {
  /** Content of the pill */
  children: React.ReactNode;
  /** Variant of the pill */
  variant?: 'default' | 'destructive';
  /** Size of the pill */
  size?: 'small' | 'medium' | 'large';
  /** Click handler */
  onClick?: () => void;
  /** Whether the pill is disabled */
  disabled?: boolean;
}

const Pill: React.FC<PillProps> = ({
  children,
  variant = 'default',
  size = 'medium',
  onClick,
  disabled = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (disabled || !onClick) return;
    setIsAnimating(true);
    onClick();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || !onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsAnimating(true);
      onClick();
    }
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  // Base classes for the container
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-medium
    transition-all duration-200
    overflow-hidden
    relative
  `;

  // Size classes (padding) for the inner spans
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs',
    medium: 'px-3 py-1 text-sm',
    large: 'px-4 py-1.5 text-base',
  };

  // Variant classes for background and foreground
  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    destructive: 'bg-destructive text-destructive-foreground',
  };

  // Hover classes: reduce opacity on hover
  const hoverClasses = {
    default: 'hover:bg-muted/80 hover:text-muted-foreground/80',
    destructive: 'hover:bg-destructive/80 hover:text-destructive-foreground/80',
  };

  // Focus-visible classes
  const focusVisibleClasses = {
    default: 'focus-visible:bg-muted/80 focus-visible:text-muted-foreground/80',
    destructive: 'focus-visible:bg-destructive/80 focus-visible:text-destructive-foreground/80',
  };

  // Animation classes for the inner spans
  const getSpanClasses = (direction: 'left' | 'right') => `
    absolute inset-0
    transition-transform duration-300 ease-out
    ${direction === 'left'
      ? isAnimating
        ? '-translate-x-full'
        : 'translate-x-0'
      : isAnimating
        ? 'translate-x-full'
        : 'translate-x-0'}
  `;

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={disabled ? undefined : 0}
      onKeyDown={handleKeyDown}
      className={`${baseClasses} ${sizeClasses[size]} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onTransitionEnd={handleTransitionEnd}
      onClick={handleClick}
      aria-disabled={disabled}
    >
      <span
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses[variant]} ${focusVisibleClasses[variant]} ${getSpanClasses('left')}`}
      />
      <span
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${hoverClasses[variant]} ${focusVisibleClasses[variant]} ${getSpanClasses('right')}`}
      />
    </div>
  );
};

export default Pill;