import { getGravatarUrl } from "../getGravatarUrl";
import sharp from "sharp";
import { updateIco } from "../updateIco";

const config = useRuntimeConfig();

let iconCache: {
    time: number;
    value: Blob;
};

export default defineEventHandler(async (event) => {
    if (iconCache && iconCache.time + config.avatarCacheTime >= Date.now()) {
        return iconCache.value;
    }
    const avatarUrl = getGravatarUrl(config.ownerEmail);

    const imageBlob: Blob = await $fetch(avatarUrl);

    const radius = 64;
    const sharpImage = sharp(Buffer.from(await imageBlob.arrayBuffer()));
    const imgMeta = await sharpImage.metadata();
    const processedImgBuffer = await sharpImage
        .composite([
            // 绘制圆角矩形
            {
                input: Buffer.from(
                    `<svg><rect x='0' y='0' width='${imgMeta.width}' height='${imgMeta.height}' rx='${radius}' ry='${radius}' fill='white'/></svg>`,
                ),
                blend: "dest-in",
            },
        ])
        .png()
        .toBuffer();
    const processedImg = new Blob([processedImgBuffer.buffer], { type: "image/png" });
    iconCache = {
        time: Date.now(),
        value: processedImg,
    };

    updateIco(processedImgBuffer);
    return processedImg;
});
