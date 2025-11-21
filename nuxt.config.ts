// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxtjs/tailwindcss"],
    css: ["assets/style.css"],

    runtimeConfig: {
        title: "Example's Main Page",
        ownerEmail: "example@example.com",
        ownerName: "ExampleName",
        ownerFormerName: "ExampleFormer",
        description: "Welcome to Example's main page",
        footer: "an example footer",
        hitokotoUrl: "https://v1.hitokoto.cn",
        gravatarUrl: "https://gravatar.com",
        avatarCacheTime: 60 * 60 * 1000, // 1 hour
        links: {},
        socials: {},
        keywords: ["main page"],
        imageHosting: false,
        imageLinks: [],
        meta: [],
        lang: "zh-CN",
    },

    compatibilityDate: "2025-08-11",
});
