import fs from "fs";
import pngToIco from "png-to-ico";

export async function updateIco(pngImage: Buffer) {
    const icoImage = await pngToIco(pngImage);
    fs.writeFile("public/favicon.ico", icoImage, () => {});
}
