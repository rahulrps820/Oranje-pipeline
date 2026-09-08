import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

/**
 * Button — the design system's one primitive so far.
 *
 * The variant axes live in `cva` rather than in hand-rolled conditionals so that the set of
 * allowed values is declared in one place, and the `hover:` / `focus-visible:` / `disabled:`
 * utilities carry the interaction states on the element itself rather than in a stylesheet
 * somewhere else.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)]",
        secondary:
          "bg-[var(--color-surface-raised)] text-[var(--color-content)] hover:bg-[var(--color-surface-sunken)]",
        outline:
          "border border-[var(--color-border)] bg-transparent text-[var(--color-content)] hover:bg-[var(--color-surface-raised)]",
        ghost: "bg-transparent text-[var(--color-content)] hover:bg-[var(--color-surface-raised)]",
        danger:
          "bg-[var(--color-danger)] text-[var(--color-danger-foreground)] hover:bg-[var(--color-danger-hover)]",
      },
      size: {
        sm: "h-8 px-3 text-[13px]",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      block: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renders a spinner and blocks interaction while an action is in flight. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "primary", size = "md", block = false, loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      data-slot="button"
      // `loading` disables too: a button that looks busy but still fires is the bug this avoids.
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, block }), className)}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
});

export { buttonVariants };
