import { fromPromise, ok, err, ResultAsync } from "neverthrow";
import { CreateTradeInput } from "./trade.schema";
import { AppError } from "../../utils/error/AppError";
import prisma from "../../lib/prisma";
import { Trade } from "../../../generated/prisma";

export const createTrade = (
  createTradeArgs: CreateTradeInput
): ResultAsync<Trade, AppError> => {
  return fromPromise(
    prisma.trade.create({
      data: {
        ...createTradeArgs,
        date: new Date(createTradeArgs.date),
      },
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

export const getTrades = () => {
  return prisma.trade.findMany();
};

export const getTradesByUserAccountIdAndEmail = (
  account: string,
  email: string
) => {
  return prisma.trade.findMany({
    where: {
      account: account,
      email: email,
    },
  });
};
