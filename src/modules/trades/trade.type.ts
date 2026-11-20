import { builder } from "../../graphql/builder";
import { CommodityType, EventType } from "../../../generated/prisma";

export const CommodityTypeEnum = builder.enumType(CommodityType, {
  name: "CommodityType",
});

export const EventTypeEnum = builder.enumType(EventType, {
  name: "EventType",
});

export const TradeType = builder.prismaObject("Trade", {
  fields: (t) => ({
    id: t.exposeInt("id"),
    account: t.exposeString("account"),
    executedAt: t.expose("executedAt", { type: "DateTime" }),
    currency: t.exposeString("currency"),
    type: t.exposeInt("type"),
    commodityType: t.expose("commodityType", { type: CommodityTypeEnum }),
    eventType: t.expose("eventType", { type: EventTypeEnum }),
    quantity: t.exposeInt("quantity"),
    price: t.exposeFloat("price"),
    commission: t.exposeFloat("commission"),
    fee: t.exposeFloat("fee"),
    email: t.exposeString("email"),
    source: t.exposeString("source"),
  }),
});
