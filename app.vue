<template>
    <div class="bg h-dvh overflow-y-hidden bg-black bg-opacity-80 flex items-center justify-center">
        <div class="content flex items-center flex-col w-[40rem]">
            <img
                :src="'/api/getAvatar'"
                class="avatar w-28 rounded-full border-4 border-white hover:rotate-[1turn] transition-transform duration-500"
                title="avatar"
            />
            <span class="text-4xl text-zinc-300 font-sans font-thin mt-6 mb-2">{{ ownerName }}</span>

            <hr class="w-1/2 border-gray-600 m-5" />

            <span class="text-lg text-zinc-400 font-thin">{{ hitokoto }}</span>

            <hr class="w-1/2 border-gray-600 m-6" />

            <span class="description text-lg text-zinc-400 font-thin">{{ description }}</span>

            <ul class="links float-left mt-6 mb-4">
                <li
                    v-for="[name, link] of Object.entries(links ?? {})"
                    class="float-left border-2 ml-2 mr-2 p-1 border-zinc-600 inline-block w-24 text-center rounded-full hover:bg-slate-600 transition-colors duration-500 transform-gpu"
                >
                    <a :href="link" class="text-base text-zinc-400 font-thin">{{ name }}</a>
                </li>
            </ul>

            <ul class="socials">
                <li v-for="{ link, icon } of Object.values(socials ?? {})" class="float-left ml-3 mr-3">
                    <a :href="link"><i :class="`${icon} text-white text-3xl`"></i></a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

useHead({
    title: config.title,
    link: [
        {
            rel: "shortcut icon",
            href: "/api/getIcon",
        },
        {
            rel: "stylesheet",
            href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css",
        },
    ],
});

const ownerName = ref(config.ownerName);
const description = ref(config.description);

const hitokotoData: Record<string, string | number> = await $fetch(config.hitokotoUrl);
const hitokoto = hitokotoData.hitokoto;

const links = ref(config.public.links as Record<string, string>);
console.log(links.value, typeof links.value);
const socials = ref(config.public.socials as Record<string, { link: string; icon: string }>);
console.log(socials.value, typeof socials.value);
</script>

