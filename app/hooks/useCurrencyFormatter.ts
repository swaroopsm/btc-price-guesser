import { currencyFormatter } from "~/lib/utils";
import { useAppContext } from "~/contexts/AppContext";
import { Currency } from "~/types";

export const useCurrencyFormatter = ({ currency }: { currency: Currency }) => {
  const { locale } = useAppContext();
  return currencyFormatter({
    locale,
    currency
  })
};
