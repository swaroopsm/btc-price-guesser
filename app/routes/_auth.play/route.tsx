import { LoaderFunction } from "@remix-run/node";
import { useBinanceStream } from "./hooks";
import { LiveCryptoPriceCard } from "~/components/cards/live-crypto-price-card";
import { getCurrentUserId } from "~/sessions";
import { useEffect, useRef, useState } from "react";
import { Prediction } from "@prisma/client";
import { Money } from "~/types";

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export const loader: LoaderFunction = async ({ request }) => {
  const currentUserId = await getCurrentUserId(request.headers.get("Cookie"));

  if (!currentUserId) {
    throw new Response("", {
      status: 401,
    });
  }

  return null;
};

export default function Start() {
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [prediction, setPrediction] = useState<{
    price: Money;
    expected: Prediction;
    timestamp: number;
  } | null>(null);
  const { price, isLoading } = useBinanceStream();

  const handlePredictionChange = (prediction: Prediction) => {
    if (price) {
      setPrediction({
        price,
        expected: prediction,
        timestamp: Date.now(),
      });
    }
  };

  useEffect(() => {
    if (prediction && intervalRef.current) {
      return;
    }

    // TODO:
    // Check if the 60 seconds time has been surpassed
    // And if yes, keep checking with the new price

    if (prediction && !intervalRef.current) {
      console.log("calling interval");
      intervalRef.current = setTimeout(() => {
        setPrediction(null);

        if (!price) {
          return;
        }
        if (prediction.price.amount > price.amount) {
          alert("UP");
        } else {
          alert("DOWN");
        }
      }, 5000);
    }
  }, [prediction, price]);

  return (
    <div className="min-h-screen items-center flex">
      <div className="max-w-xl flex-1 mx-auto">
        <LiveCryptoPriceCard
          price={price}
          loading={isLoading}
          ticker="BTC"
          onPredictionChange={handlePredictionChange}
          prediction={prediction}
        />
      </div>
    </div>
  );
}
