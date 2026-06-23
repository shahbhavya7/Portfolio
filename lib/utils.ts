import { clsx, type ClassValue } from "clsx";

/**
 * Merge class names conditionally using clsx.
 * Useful for combining Tailwind classes with conditional logic.
 *
 * @example
 * cn("base-class", isActive && "active-class", className)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
