import { ActionFunction } from "@remix-run/node";
import { useBinanceStream, usePrediction } from "./hooks";
import { LiveCryptoPriceCard } from "~/components/cards/live-crypto-price-card";
import { getCurrentPlayer } from "~/sessions";
import { AuthOutletContext, Prediction } from "~/types";
import { useCallback, useState } from "react";
import { useOutletContext, useSubmit } from "@remix-run/react";
import { Guess, ResolvedGuess } from "./types";
import { useCurrencyFormatter } from "~/hooks";

// TODO: Change description
export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const isPredictionCorrect = formData.get("isPredictionCorrect") === "true";

  const player = await getCurrentPlayer(request.headers.get("Cookie"));

  if (isPredictionCorrect) {
    await player?.incrementScore();
  } else {
    await player?.decrementScore();
  }

  return null;
};

export default function Play() {
  const { price, isLoading } = useBinanceStream();
  const submit = useSubmit();
  const { player } = useOutletContext<AuthOutletContext>();
  const [lastResolvedGuess, setLastResolvedGuess] =
    useState<ResolvedGuess | null>(null);

  const handleResolution = useCallback(
    async (resolvedGuess: ResolvedGuess) => {
      const isPredictionCorrect =
        resolvedGuess.expected === resolvedGuess.actual;

      setLastResolvedGuess(resolvedGuess);

      try {
        submit(
          {
            isPredictionCorrect,
          },
          { method: "post" }
        );
      } catch (e) {
        // TODO: Handle error
      }
    },
    [submit]
  );

  const { prediction, setPrediction } = usePrediction({
    price,
    onResolution: handleResolution,
  });

  const handlePredictionChange = (prediction: Prediction) => {
    if (price) {
      setPrediction({
        price,
        expected: prediction,
        timestamp: Date.now(),
      });
    }
  };

  const showLastGuess = Boolean(!prediction && lastResolvedGuess);

  return (
    <div className="min-h-screen items-center flex">
      <div className="max-w-md flex-1 mx-auto">
        <LiveCryptoPriceCard
          price={price}
          loading={isLoading}
          ticker="BTC"
          onPredictionChange={handlePredictionChange}
          prediction={prediction?.expected}
          player={player}
        />

        {(prediction || showLastGuess) && (
          <div className="relative flex justify-center max-w-[75%] m-auto">
            <p className="text-sm text-center absolute top-0 py-4">
              {prediction && (
                <>
                  Hold on tight, you predicted {prediction.expected} . May the
                  Crypto gods be your side
                </>
              )}

              {showLastGuess && lastResolvedGuess && (
                <>
                  Your last was: Expected: {lastResolvedGuess.expected} Actual:{" "}
                  {lastResolvedGuess.actual}
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
