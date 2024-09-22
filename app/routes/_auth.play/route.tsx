import { LoaderFunction } from "@remix-run/node";
import { useBinanceStream, usePrediction } from "./hooks";
import { LiveCryptoPriceCard } from "~/components/cards/live-crypto-price-card";
import { getCurrentUserId } from "~/sessions";
import { Prediction } from "~/types";

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
  const { price, isLoading } = useBinanceStream();
  const { prediction, setPrediction } = usePrediction({ price });

  const handlePredictionChange = (prediction: Prediction) => {
    if (price) {
      setPrediction({
        price,
        expected: prediction,
        timestamp: Date.now(),
      });
    }
  };

  return (
    <div className="min-h-screen items-center flex">
      <div className="max-w-md flex-1 mx-auto">
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
