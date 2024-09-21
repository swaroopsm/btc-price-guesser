export enum Currency {
  Usd = 'USD',
}

export interface Money {
  amount: number;
  currency: Currency;
}
