import { useEffect, useState } from "react";
import { Money, Currency } from "~/types";
import { BINANCE_BTC_USD_STREAM_URL } from "../constants";

export const useBinanceStream = () => {
  const [price, setPrice] = useState<Money | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(BINANCE_BTC_USD_STREAM_URL);

    ws.onmessage = (e) => {
      const { p: currentPrice } = JSON.parse(e.data);

      setPrice({
        amount: parseFloat(currentPrice),
        currency: Currency.Usd,
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (isLoading && price) {
      setLoading(false);
    }
  }, [price, isLoading]);

  return {
    price,
    isLoading,
  };
};
