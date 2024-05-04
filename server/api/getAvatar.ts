import { getGravatarUrl } from "../getGravatarUrl";

const config = useRuntimeConfig();

let avatarCache: {
    time: number;
    value: Blob;
};

export default defineEventHandler(async (event) => {
    if (avatarCache && avatarCache.time + config.avatarCacheTime >= Date.now()) {
        return avatarCache.value;
    }
    const avatarUrl = getGravatarUrl(config.ownerEmail);
    const imageBlob: Blob = await $fetch(avatarUrl);
    avatarCache = {
        time: Date.now(),
        value: imageBlob,
    };
    return imageBlob;
});
