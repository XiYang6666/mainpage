import { getAvatarBuffer, getAvatarUrl } from "../util/avatar";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    return config.avatarProxy ? getAvatarBuffer() : sendRedirect(event, getAvatarUrl().toString());
});
