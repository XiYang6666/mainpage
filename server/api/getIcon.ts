import { getGravatarUrl } from "../getGravatarUrl";
import sharp from "sharp";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
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
    
    return processedImg;
});
