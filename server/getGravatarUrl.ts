import { createHash } from "crypto";

export function getGravatarUrl(email: string, size: number = 256) {
    const runtimeConfig = useRuntimeConfig();

    const trimmedEmail = email.trim().toLowerCase();
    const hash = createHash("sha256").update(trimmedEmail).digest("hex");
    return `${runtimeConfig.gravatarUrl}/avatar/${hash}?s=${size}&d=identicon`;
}
