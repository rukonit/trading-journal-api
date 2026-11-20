import { builder } from "./builder";

// Register module types and fields with the builder (side-effect imports)
import "../modules/user/user.type";
import "../modules/user/user.resolver";
import "../modules/trades/trade.type";
import "../modules/trades/trade.resolver";

export const schema = builder.toSchema();
