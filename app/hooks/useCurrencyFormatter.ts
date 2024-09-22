import { currencyFormatter } from "~/lib/utils";
import { useAppContext } from "~/contexts/AppContext";
import { Money } from "~/types";

export const useCurrencyFormatter = () => {
  const { locale } = useAppContext();

  return {
    format: (price: Money) => {
      const formatter = currencyFormatter({
        locale,
        currency: price.currency,
      });

      return formatter.format(price.amount);
    },
  };
};
