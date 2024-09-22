import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRelativePriceChange = (oldPrice: number, newPrice: number) => {
  return (newPrice - oldPrice) / oldPrice;
};
