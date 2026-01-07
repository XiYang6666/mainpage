import { getGravatarUrl } from "../util/gravatar";

const config = useRuntimeConfig();
let lastGetTime: number;
let avatarCache:
    | {
          time: number;
          value: Buffer;
      }
    | undefined;

export default defineEventHandler(async (event) => {
    if (config.avatarProxy) {
        if (avatarCache && avatarCache.time + config.avatarCacheTime >= Date.now()) {
            return avatarCache.value;
        }
        const now = Date.now();
        avatarCache = {
            time: now,
            value: Buffer.from(
                await (await fetch(getGravatarUrl(config.ownerEmail, 256, now).toString())).arrayBuffer(),
            ),
        };
        return avatarCache.value;
    } else {
        if (!(lastGetTime && lastGetTime + config.avatarCacheTime >= Date.now())) {
            lastGetTime = Date.now();
        }
        return sendRedirect(event, getGravatarUrl(config.ownerEmail, 256, lastGetTime).toString());
    }
});
