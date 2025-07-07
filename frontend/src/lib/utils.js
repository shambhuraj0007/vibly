import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// this is a utility function that merges class names using clsx and tailwind-merge made by shadcn automatically
