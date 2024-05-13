import fs from "fs";
import { randomInt } from "crypto";

export default defineEventHandler((event) => {
    const imgList = fs.readdirSync("public/backgrounds");
    const imgName = imgList[randomInt(imgList.length)];
    return sendRedirect(event, `/backgrounds/${imgName}`);
});
