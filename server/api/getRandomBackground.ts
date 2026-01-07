import fs from "fs/promises";
import { randomInt } from "crypto";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    if (config.imageHosting) {
        const imgList: string[] = config.imageLinks;
        const imgLink = imgList[randomInt(imgList.length)];
        return sendRedirect(event, imgLink);
    } else {
        const imgList = await fs.readdir("public/backgrounds");
        const imgName = imgList[randomInt(imgList.length)];
        return sendRedirect(event, `/backgrounds/${imgName}`);
    }
});
