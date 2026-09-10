import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

type Size = 'Small' | 'Medium' | 'Large' | 'xx-Large';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: Size;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  size = 'Medium',
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus trapping
  useEffect(() => {
    if (!open) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]',
    ]
      .join(',')
      .trim();

    const firstFocusable = dialog.querySelector<HTMLElement>(
      focusableElements
    );
    const lastFocusable = dialog.querySelector<HTMLElement>(
      focusableElements + ':last-of-type'
    );

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      if (dialog.contains(document.activeElement) === false) {
        e.preventDefault();
        firstFocusable?.focus();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();

    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={cn(
          'relative bg-card rounded-card border border-border shadow-none w-full max-w-2xl outline-none',
          'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-foreground'
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className={sizeToPadding[size]}>{children}</div>
      </div>
    </div>,
    document.body
  );
};

const sizeToPadding: Record<Size, string> = {
  Small: 'p-4',
  Medium: 'p-6',
  Large: 'p-8',
  'xx-Large': 'p-10',
};

export default Modal;