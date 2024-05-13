import { createHash } from "crypto";

export function getGravatarUrl(email: string, size: number = 256) {
    const runtimeConfig = useRuntimeConfig();

    const trimmedEmail = email.trim().toLowerCase();
    const hash = createHash("sha256").update(trimmedEmail).digest("hex");
    return new URL(`/avatar/${hash}?s=${size}&d=identicon}`, runtimeConfig.gravatarUrl);
}
