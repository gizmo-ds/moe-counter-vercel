import { IBase, Deta, Fauna } from "./base/index";

export const db: IBase =
  process.env.DB_TYPE === "fauna"
    ? new Fauna(process.env.FAUNA_SECRET, "moe-counter")
    : new Deta(process.env.DETA_PROJECT_KEY, "moe-counter");
