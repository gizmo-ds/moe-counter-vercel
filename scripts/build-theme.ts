import * as fs from "fs";
import * as path from "path";
import * as mimeType from "mime-types";
import { imageSize } from "image-size";

const themePath = path.resolve(__dirname, "../Moe-counter/assets/theme");
const savePath = path.resolve(__dirname, "../themes");

fs.existsSync(savePath) || fs.mkdirSync(savePath, { recursive: true });

function build(theme: string) {
  const imgList = fs.readdirSync(path.resolve(themePath, theme));
  let data = "export default {\n";
  imgList.forEach((img) => {
    const imgPath = path.resolve(themePath, theme, img);
    const name = path.parse(img).name;
    const { width, height } = imageSize(imgPath);
    data += `${name}:{width:${width},height:${height},data:"${convertToDatauri(imgPath)}"},\n`;
  });
  data += "}";
  fs.writeFileSync(path.resolve(savePath, theme + ".js"), data);
}

function convertToDatauri(path) {
  const mime = mimeType.lookup(path);
  const base64 = fs.readFileSync(path).toString("base64");
  return `data:${mime};base64,${base64}`;
}

fs.readdirSync(themePath).forEach((theme) => build(theme));
