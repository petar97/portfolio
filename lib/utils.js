import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// next/image and plain <a> don't apply basePath to string paths
export const asset = (path) => `${process.env.NEXT_PUBLIC_BASE_PATH}${path}`;
