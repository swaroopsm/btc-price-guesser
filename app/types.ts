export enum Currency {
  Usd = "USD",
}

export interface Money {
  amount: number;
  currency: Currency;
}

// Export server types
export { Prediction } from "@prisma/client";
