import { useEffect, useState } from "react";
import { Money, Currency } from "~/types";


const BINANCE_STREAM_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

export const useBinanceStream = () => {
  const [price, setPrice] = useState<Money | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const ws = new WebSocket(BINANCE_STREAM_URL);

    ws.onmessage = (e) => {
      const { p: currentPrice } = JSON.parse(e.data);

      setPrice({
        amount: parseFloat(currentPrice),
        currency: Currency.Usd,
      })
    }

    return () => {
      ws.close()
    }

  }, []);

  useEffect(() => {
    if (isLoading && price) {
      setLoading(false)
    }

  }, [price, isLoading]);

  return {
    price,
    isLoading
  }
};
