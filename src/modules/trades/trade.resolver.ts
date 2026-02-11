import { validateSchema } from "../../utils/validateSchema";
import {
  createTrade,
  getTrades,
  getTradesByUserAccountIdAndEmail,
} from "./trade.service";
import { createTradeSchema } from "./trade.schema";
import { handlePrismaError } from "../../utils/error/handlePrismaError";
import { AppError } from "../../utils/error/AppError";
import { Trade } from "../../../generated/prisma";

export default {
  Query: {
    trades: () => getTrades(),
    getTradesByUserAccountIdAndEmail: (
      _: unknown,
      args: Pick<Trade, "account" | "email">
    ) => getTradesByUserAccountIdAndEmail(args.account, args.email),
  },
  Mutation: {
    createTrade: async (_: unknown, args: unknown) => {
      return validateSchema(createTradeSchema, args)
        .asyncAndThen((data) => {
          return createTrade(data);
        })
        .match(
          (trade) => trade,
          (error) => {
            if (error instanceof AppError) {
              throw error;
            }
            throw handlePrismaError(error);
          }
        );
    },
  },
};
