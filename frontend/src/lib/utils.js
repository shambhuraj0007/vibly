import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseISO, formatDistanceToNow } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
// this is a utility function that merges class names using clsx and tailwind-merge made by shadcn automatically
;

export const formatDate = (date) => {
  return formatDistanceToNow(parseISO(date), { addSuffix: true });
};
//
