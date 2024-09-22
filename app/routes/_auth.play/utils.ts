import { Money, Prediction } from "~/types";

export const isPredictedPriceCorrect = ({
  predictedPrice,
  actualPrice,
  prediction,
}: {
  predictedPrice: Money;
  actualPrice: Money;
  prediction: Prediction;
}) => {
  const actual =
    actualPrice.amount > predictedPrice.amount
      ? Prediction.UP
      : Prediction.DOWN;

  return actual === prediction;
};
