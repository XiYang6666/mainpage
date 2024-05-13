import { getGravatarUrl } from "../getGravatarUrl";

const config = useRuntimeConfig();
let lastGetTime: number;

export default defineEventHandler(async (event) => {
    if (!(lastGetTime && lastGetTime + config.avatarCacheTime >= Date.now())) {
        lastGetTime = Date.now();
    }
    return sendRedirect(event, getGravatarUrl(config.ownerEmail, 256, lastGetTime).toString());
});
