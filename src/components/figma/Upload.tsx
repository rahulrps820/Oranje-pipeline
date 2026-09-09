import React from 'react';

interface UploadProps {
  /** Variant axis: outline or stroke line style */
  format: 'Outline' | 'Stroke';
  /** Variant axis: weight of the lines */
  weight: 'Bold' | 'Duotone' | 'Fill' | 'Light' | 'Regular' | 'Thin';
  /** Optional size in pixels (width and height) */
  size?: number;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Upload button component – an accessible wrapper around an upload icon.
 * Supports the design system's Format and Weight variant axes.
 */
const Upload: React.FC<UploadProps> = ({
  format = 'Outline',
  weight = 'Regular',
  size = 24,
  disabled = false,
  onClick,
}) => {
  // Map weight token to a numeric stroke width (ignored for Fill weight)
  const weightMap: Record<UploadProps['weight'], number> = {
    Thin: 1,
    Light: 2,
    Regular: 3,
    Bold: 4,
    Duotone: 2,
    Fill: 0,
  };
  const strokeWidth = weightMap[weight];

  // Determine fill and stroke based on format and weight
  let fill: 'none' | 'currentColor' = 'none';
  if (format === 'Outline') {
    fill = 'none';
  } else if (format === 'Stroke') {
    fill = 'currentColor';
  }
  // Overrides for specific weights
  if (weight === 'Fill') {
    fill = 'currentColor';
    // stroke width effectively zero (no stroke)
  }
  if (weight === 'Duotone') {
    // duotone shows both stroke and fill
    fill = 'currentColor';
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      aria-label="Upload"
      disabled={disabled}
      onClick={handleClick}
      className="inline-flex items-center justify-center border border-muted text-foreground hover:bg-muted focus-visible:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ borderRadius: 'var(--radius-medium)' }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="block"
      >
        {/* Upload icon: box with upward arrow */}
        <path d="M9 4h6v3h4l-5 5-5-5h4V4h3zM5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </button>
  );
};

export default Upload;