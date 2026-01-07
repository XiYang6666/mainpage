import { getGravatarUrl } from "../util/gravatar";
import sharp from "sharp";
import { updateIco } from "../updateIco";

const config = useRuntimeConfig();

let iconCache:
    | {
          time: number;
          value: Buffer;
      }
    | undefined;

export default defineEventHandler(async (event) => {
    if (iconCache && iconCache.time + config.avatarCacheTime >= Date.now()) {
        return iconCache.value;
    }
    const avatarUrl = getGravatarUrl(config.ownerEmail);

    const imageBuffer: Buffer = Buffer.from(await $fetch(avatarUrl.toString(), { responseType: "arrayBuffer" }));

    const radius = 64;
    const sharpImage = sharp(imageBuffer);
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
    const lastCache = iconCache;
    iconCache = {
        time: Date.now(),
        value: processedImgBuffer,
    };

    updateIco(processedImgBuffer);
    return processedImgBuffer;
});
