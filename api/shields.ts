import { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../src/db";

export default async function (req: VercelRequest, res: VercelResponse) {
  await db.Init();
  const key = req.query.key as string;
  let data = { key, num: "0123456789" };
  if (key !== "demo") {
    data = await db.Get(key);
  }
  res.send({
    schemaVersion: 1,
    label: data.key,
    message: data.num.toString(),
    color: "2F855A",
  });
}
