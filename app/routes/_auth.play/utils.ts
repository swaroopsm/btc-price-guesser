import { Money, Prediction } from "~/types";
import { Guess } from "./types";

export const getGuessResult = ({
  guess,
  price,
}: {
  guess: Guess;
  price: Money;
}) => {
  const result =
    price.amount > guess.price.amount ? Prediction.UP : Prediction.DOWN;

  return result;
};

export const getPredictionDisplayName = (prediction: Prediction) => {
  if (prediction === Prediction.UP) {
    return "High";
  }

  return "Low";
};
