import { useAppContext } from "~/contexts/AppContext";
import { Money } from "~/types";

export const useCurrencyFormatter = () => {
  const { locale } = useAppContext();

  return {
    format: (price: Money) => {
      const formatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: price.currency,
      });

      return formatter.format(price.amount);
    },
  };
};

export const usePercentageFormatter = () => {
  const { locale } = useAppContext();

  return {
    format: (value: number) => {
      const formatter = new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 4,
      });

      return formatter.format(value);
    },
  };
};
