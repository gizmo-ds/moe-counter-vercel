import { VercelRequest, VercelResponse } from "@vercel/node";
import Deta from "../src/base/deta";

export default async function (req: VercelRequest, res: VercelResponse) {
  const key = req.query.key as string;
  let data = { key, num: "0123456789" };
  if (key !== "demo") {
    data = await new Deta(process.env.DETA_PROJECT_KEY, "moe-counter").Get(key);
  }
  res.send(data);
}
