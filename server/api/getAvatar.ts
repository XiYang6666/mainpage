import { getGravatarUrl } from "../getGravatarUrl";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const avatarUrl = getGravatarUrl(config.ownerEmail);
    const imageBlob: Blob = await $fetch(avatarUrl);
    return imageBlob;
});
