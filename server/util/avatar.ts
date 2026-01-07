import NodeCache from "node-cache";
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { getGravatarUrl } from "./gravatar";

const config = useRuntimeConfig();
const cache = new NodeCache({ stdTTL: config.avatarCacheTime });
const avatarUrlKey = "avatar_url";
const avatarBufferKey = "avatar_buffer";
const iconBufferKey = "icon_buffer";

export function getAvatarUrl(): URL {
    if (cache.has(avatarUrlKey)) return cache.get(avatarUrlKey) as URL;
    const result = getGravatarUrl(config.ownerEmail, Date.now());
    cache.set(avatarUrlKey, result);
    return result;
}

export async function getAvatarBuffer(): Promise<Buffer> {
    if (cache.has(avatarBufferKey)) return cache.get(avatarBufferKey) as Buffer;
    const avatarUrl = getGravatarUrl(config.ownerEmail);
    const result = Buffer.from(await $fetch(avatarUrl.toString(), { responseType: "arrayBuffer" }));
    cache.set(avatarBufferKey, result);
    return result;
}

export async function getIconBuffer(): Promise<Buffer> {
    if (cache.has(iconBufferKey)) return cache.get(iconBufferKey) as Buffer;
    const avatarBuffer = await getAvatarBuffer();

    const sharpImage = sharp(avatarBuffer);
    const imgMeta = await sharpImage.metadata();
    const radius = 64;
    const pngBuffer = await sharpImage
        .composite([
            {
                input: Buffer.from(
                    `<svg><rect x='0' y='0' width='${imgMeta.width}' height='${imgMeta.height}' rx='${radius}' ry='${radius}' fill='white'/></svg>`,
                ),
                blend: "dest-in",
            },
        ])
        .png()
        .toBuffer();
    const result = await pngToIco(pngBuffer);
    cache.set(iconBufferKey, result);
    return result;
}
