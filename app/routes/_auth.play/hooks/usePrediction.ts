import { useEffect, useRef, useState } from "react";
import { Money } from "~/types";
import { getGuessResult } from "../utils";
import { Guess, ResolvedGuess } from "../types";
import { PREDICTION_WATCHER_TIMEOUT_IN_MILLISECONDS } from "../constants";

interface Props {
  price: Money | null;
  onResolution: (resolvedGuess: ResolvedGuess) => void;
}

export const usePrediction = ({ price, onResolution }: Props) => {
  const [prediction, setPrediction] = useState<Guess | null>(null);
  const [canCheckPrediction, setCheckPrediction] = useState(false);
  const [isWatching, setWatching] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prediction && !intervalRef.current) {
      setWatching(true);

      intervalRef.current = setTimeout(() => {
        setCheckPrediction(true);
      }, PREDICTION_WATCHER_TIMEOUT_IN_MILLISECONDS);
    }

    // TODO
    // Clear timeout on unmount
    // Cleanup dangling timeouts
    // return () => {
    //   if (!prediction && intervalRef.current) {
    //     console.log("clear poller");
    //     clearTimeout(intervalRef.current);
    //   }
    // };
  }, [prediction, price]);

  useEffect(() => {
    if (canCheckPrediction) {
      const hasPriceChanged = prediction?.price?.amount !== price?.amount;

      if (hasPriceChanged && price && prediction) {
        setPrediction(null);
        setCheckPrediction(false);
        setWatching(false);
        intervalRef.current = null;

        onResolution({
          ...prediction,
          actual: getGuessResult({ guess: prediction, price }),
          resolvedPrice: price,
        });
      }
    }
  }, [price, canCheckPrediction, prediction, onResolution]);

  return {
    prediction,
    setPrediction,
    isWatching,
  };
};
