import { getGravatarUrl } from "../getGravatarUrl";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    return sendRedirect(event, getGravatarUrl(config.ownerEmail))
});
