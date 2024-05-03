// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
    css: ["public/style.css"],
    runtimeConfig: {
        title: "Example's Main Page",
        ownerEmail: "example@example.com",
        ownerName: "Example",
        description: "Welcome to Example's main page",
        hitokotoUrl: "https://v1.hitokoto.cn",
        gravatarUrl: "https://gravatar.com",
        public: {
            links: {},
            socials: {},
        },
    }
});

