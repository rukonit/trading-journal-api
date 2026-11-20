import { builder } from "../../graphql/builder";
import { validateSchema } from "../../utils/validateSchema";
import {
  createTrade,
  getTrades,
  getTradesByUserAccountIdAndEmail,
} from "./trade.service";
import { createTradeSchema } from "./trade.schema";
import { CommodityTypeEnum, EventTypeEnum } from "./trade.type";
import { handlePrismaError } from "../../utils/error/handlePrismaError";
import { AppError } from "../../utils/error/AppError";

builder.queryFields((t) => ({
  trades: t.prismaField({
    type: ["Trade"],
    resolve: (query) => getTrades(query),
  }),
  getTradesByUserAccountIdAndEmail: t.prismaField({
    type: ["Trade"],
    args: {
      account: t.arg.string({ required: true }),
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args) =>
      getTradesByUserAccountIdAndEmail(args.account, args.email, query),
  }),
}));

builder.mutationField("createTrade", (t) =>
  t.prismaField({
    type: "Trade",
    args: {
      account: t.arg.string({ required: true }),
      executedAt: t.arg({ type: "DateTime", required: true }),
      currency: t.arg.string({ required: true }),
      type: t.arg.int({ required: true }),
      commodityType: t.arg({ type: CommodityTypeEnum, required: true }),
      eventType: t.arg({ type: EventTypeEnum, required: true }),
      quantity: t.arg.int({ required: true }),
      price: t.arg.float({ required: true }),
      commission: t.arg.float({ required: true }),
      fee: t.arg.float({ required: true }),
      email: t.arg.string({ required: true }),
      source: t.arg.string({ required: true }),
    },
    resolve: (query, _root, args) =>
      validateSchema(createTradeSchema, args)
        .asyncAndThen((data) => createTrade(data, query))
        .match(
          (trade) => trade,
          (error) => {
            if (error instanceof AppError) {
              throw error;
            }
            throw handlePrismaError(error);
          }
        ),
  })
);
