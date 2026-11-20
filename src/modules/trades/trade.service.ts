import { fromPromise, ok, err, ResultAsync } from "neverthrow";
import { CreateTradeInput } from "./trade.schema";
import { AppError } from "../../utils/error/AppError";
import prisma from "../../lib/prisma";
import { Prisma, Trade } from "../../../generated/prisma";

type TradeQuery = { select?: Prisma.TradeSelect };

export const createTrade = (
  createTradeArgs: CreateTradeInput,
  query: TradeQuery = {}
): ResultAsync<Trade, AppError> => {
  return fromPromise(
    prisma.trade.create({
      ...query,
      data: createTradeArgs,
    }),
    (_error) => {
      return new AppError("Database error", 500);
    }
  ).andThen((trade) => {
    if (!trade) {
      return err(new AppError("Trade creation failed", 500));
    }

    return ok(trade);
  });
};

export const getTrades = (query: TradeQuery = {}) => {
  return prisma.trade.findMany({ ...query });
};

export const getTradesByUserAccountIdAndEmail = (
  account: string,
  email: string,
  query: TradeQuery = {}
) => {
  return prisma.trade.findMany({
    ...query,
    where: {
      account: account,
      email: email,
    },
  });
};
