import fs from "fs";
import url from "url";
import { randomInt } from "crypto";

export default defineEventHandler((event) => {
    const imgList = fs.readdirSync("public/backgrounds");
    console.log;
    const imgName = imgList[randomInt(imgList.length)];
    return sendRedirect(event, url.resolve("/backgrounds/", imgName));
});
