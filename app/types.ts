import * as PrismaClient from "@prisma/client";

type TimestampString<T> = T extends Date ? string : never;

export enum Currency {
  Usd = "USD",
}

export interface Money {
  amount: number;
  currency: Currency;
}

export enum Prediction {
  UP = "up",
  DOWN = "down",
}

export interface Player
  extends Pick<PrismaClient.Player, "id" | "name" | "score"> {
  createdAt: TimestampString<PrismaClient.Player["createdAt"]>;
  updatedAt: TimestampString<PrismaClient.Player["updatedAt"]>;
}

export interface AuthOutletContext {
  player: Player;
}
