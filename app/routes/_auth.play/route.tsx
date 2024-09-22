import { ActionFunction } from "@remix-run/node";
import { useBinanceStream, usePrediction } from "./hooks";
import { LiveCryptoPriceCard } from "~/components/cards/live-crypto-price-card";
import { getCurrentPlayer } from "~/sessions";
import { AuthOutletContext, Prediction } from "~/types";
import { ComponentProps, useCallback, useMemo, useState } from "react";
import { useOutletContext, useSubmit } from "@remix-run/react";
import { ResolvedGuess } from "./types";
import { FeedbackBanner } from "~/components/Feedbackbanner";
import { getPredictionDisplayName } from "./utils";
import { getRelativePriceChange } from "~/lib/utils";
import { usePercentageFormatter } from "~/hooks";

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
  const percentageFormatter = usePercentageFormatter();
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

  const { prediction, setPrediction, isWatching } = usePrediction({
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
  const feedbackBannerProps = useMemo<ComponentProps<
    typeof FeedbackBanner
  > | null>(() => {
    if (isWatching && prediction) {
      return {
        status: "loading",
        title: "Hold tight! Pray to the Crypto gods!",
        children: (
          <>
            Your prediction that BTC price will go{" "}
            <strong className="font-bold uppercase underline">
              {getPredictionDisplayName(prediction.expected)}
            </strong>{" "}
            is being watched...
          </>
        ),
      };
    }

    if (lastResolvedGuess) {
      const isPredictionCorrect =
        lastResolvedGuess.actual === lastResolvedGuess.expected;
      const priceChange = getRelativePriceChange(
        lastResolvedGuess.price.amount,
        lastResolvedGuess.resolvedPrice.amount
      );
      const pricePercent = priceChange * 100;
      const formattedPricePercent = percentageFormatter.format(pricePercent);

      // Success prediction
      if (isPredictionCorrect) {
        return {
          status: "success",
          title: "Spot on! You nailed it",
          children: (
            <>
              You predicted{" "}
              <strong className="uppercase font-bold">
                {getPredictionDisplayName(lastResolvedGuess.expected)}
              </strong>{" "}
              and the price of BTC went{" "}
              <strong className="uppercase font-bold">
                {getPredictionDisplayName(lastResolvedGuess.actual)}
              </strong>
              . The price of BTC changed by: {formattedPricePercent}
            </>
          ),
        };
      }

      // Fail prediction
      return {
        status: "fail",
        title: "Missed it! Try again!",
        children: (
          <>
            You predicted{" "}
            <strong className="uppercase font-bold">
              {getPredictionDisplayName(lastResolvedGuess.expected)}
            </strong>{" "}
            but the price of BTC went{" "}
            <strong className="uppercase font-bold">
              {getPredictionDisplayName(lastResolvedGuess.actual)}
            </strong>
            . The price of BTC changed by: {formattedPricePercent}
          </>
        ),
      };
    }

    return null;
  }, [isWatching, lastResolvedGuess, percentageFormatter, prediction]);

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
          <div className="relative flex justify-center">
            {feedbackBannerProps && (
              <FeedbackBanner
                {...feedbackBannerProps}
                className="mt-4 absolute top-0"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
