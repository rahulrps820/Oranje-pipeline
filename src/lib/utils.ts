import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names, letting a caller's utility win over the component's own.
 *
 * `twMerge` on top of `clsx` is what makes `className="px-8"` actually override the variant's
 * padding instead of both landing in the class list and the cascade picking arbitrarily.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
