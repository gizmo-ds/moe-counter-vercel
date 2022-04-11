import { Deta, Fauna, IBase, Mongo } from "./base/index";

export const db: IBase = function (): IBase {
  switch (process.env.DB_TYPE) {
    case "fauna":
      return new Fauna(process.env.FAUNA_SECRET, "moe-counter");
    case "mongo":
      return new Mongo(
        process.env.MONGODB_URI,
        process.env.MONGODB_COLLECTION ?? "moe-counter",
      );
    default:
      return new Deta(process.env.DETA_PROJECT_KEY, "moe-counter");
  }
}();
