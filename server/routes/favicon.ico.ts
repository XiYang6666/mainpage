import { getIconBuffer } from "../util/avatar";

export default defineEventHandler(async (event) => {
    return await getIconBuffer();
});
