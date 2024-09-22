import { Money, Prediction } from "~/types";

export interface Guess {
  price: Money;
  expected: Prediction;
  timestamp: number;
}

export interface ResolvedGuess extends Guess {
  actual: Prediction;
}
