import { useEffect, useRef, useState } from "react";
import { Money, Prediction } from "~/types";
import { isPredictedPriceCorrect } from "../utils";

interface Props {
  price: Money | null;
  onResolution: (isPredictionCorrect: boolean) => void;
}

type Guess = {
  price: Money;
  expected: Prediction;
  timestamp: number;
};

export const usePrediction = ({ price, onResolution }: Props) => {
  const [prediction, setPrediction] = useState<Guess | null>(null);
  const [canCheckPrediction, setCheckPrediction] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (prediction && !intervalRef.current) {
      console.log("start poller");
      intervalRef.current = setTimeout(() => {
        intervalRef.current = null;
        setCheckPrediction(true);
      }, 5000);
    }

    // Cleanup dangling timeouts
    return () => {
      if (!prediction && intervalRef.current) {
        console.log("clear poller");
        clearTimeout(intervalRef.current);
      }
    };

    // TODO
    // Clear timeout on unmount
  }, [prediction, price]);

  useEffect(() => {
    if (canCheckPrediction) {
      console.log({ canCheckPrediction });
      const hasPriceChanged = prediction?.price?.amount !== price?.amount;

      if (hasPriceChanged && price && prediction) {
        setPrediction(null);
        setCheckPrediction(false);
        intervalRef.current = null;

        onResolution(
          isPredictedPriceCorrect({
            predictedPrice: prediction.price,
            actualPrice: price,
            prediction: prediction.expected,
          })
        );
      }
    }
  }, [price, canCheckPrediction, prediction, onResolution]);

  return {
    prediction,
    setPrediction,
  };
};
