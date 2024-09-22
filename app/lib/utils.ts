import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Currency } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const currencyFormatter = ({
  locale,
  currency,
}: {
  locale: string;
  currency: Currency;
}) => {
  return new Intl.NumberFormat(locale, { style: "currency", currency });
};

export const getRelativePriceChange = (oldPrice: number, newPrice: number) => {
  return (newPrice - oldPrice) / oldPrice;
};
