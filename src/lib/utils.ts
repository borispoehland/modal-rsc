import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wait(timeoutInMs: number) {
  return new Promise((resolve) => setTimeout(resolve, timeoutInMs));
}
