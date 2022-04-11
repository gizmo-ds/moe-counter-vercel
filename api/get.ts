import { VercelRequest, VercelResponse } from "@vercel/node";
import * as path from "path";
import { db } from "../src/db";

export default async function (req: VercelRequest, res: VercelResponse) {
  await db.Init();
  let { theme = "moebooru", length = "7" } = req.query;
  const key: string = req.query.key as string;

  let data = { key, num: "0123456789" };
  if (key === "demo") {
    length = "9";
  } else {
    data = await db.Get(key);
  }

  const themesDirectory = path.resolve(process.cwd(), `themes/${theme}`);
  const _theme = require(themesDirectory).default;

  let x = 0,
    y = 0;
  const countArray = data.num.toString().padStart(
    parseInt(length as string),
    "0",
  ).split("");
  const parts = countArray.reduce((acc: any, next: string | number) => {
    const { width, height, data } = _theme[next];
    const image = `${acc}
      <image x="${x}" y="0" width="${width}" height="${height}" xlink:href="${data}" />`;
    x += width;
    if (height > y) y = height;
    return image;
  }, "");

  res.setHeader(
    "cache-control",
    "max-age=0, no-cache, no-store, must-revalidate",
  );
  res.setHeader("content-type", "image/svg+xml; charset=utf-8");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="${x}" height="${y}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>Moe Count</title>
    <g>
      ${parts}
    </g>
</svg>
`);
}
