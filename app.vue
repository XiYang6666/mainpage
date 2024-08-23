<template>
    <div class="bg h-dvh w-dvw overflow-hidden bg-black bg-opacity-80 flex items-center justify-center flex-col">
        <div class="content flex items-center flex-col w-[40rem]">
            <img
                :src="'/api/getAvatar'"
                class="avatar w-28 h-28 bg-slate-800 rounded-full border-4 border-white hover:rotate-[1turn] transition-transform duration-500"
                title="avatar"
            />
            <span class="text-4xl text-zinc-300 font-sans font-thin text-center mt-6 mb-2">{{ ownerName }}</span>

            <hr class="w-1/2 border-gray-600 m-5" />

            <span class="text-lg text-zinc-400 font-thin text-center break-after-auto max-w-[95dvw]">{{
                hitokoto
            }}</span>

            <hr class="w-1/2 border-gray-600 m-6" />

            <span class="description text-lg text-zinc-400 font-thin text-center">{{ description }}</span>

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
                    <a :href="link"
                        ><i
                            :class="`${icon} text-white text-3xl hover:text-slate-600 transition-colors duration-300 transform-gpu`"
                        ></i
                    ></a>
                </li>
            </ul>
        </div>
        <span class="footer fixed bottom-4 text-lg text-zinc-400 font-thin text-center" v-html="footer"></span>
    </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const ownerName = useState(() => config.ownerName);
const description = useState(() => config.description);

const hitokoto: Ref<string> = useState();

if (process.server) {
    const hitokotoData: Record<string, any> = await $fetch(config.hitokotoUrl);
    hitokoto.value = hitokotoData.hitokoto;
}

const footer = useState(() => config.footer);

const links = useState(() => config.links as Record<string, string>);
const socials = useState(() => config.socials as Record<string, { link: string; icon: string }>);

const keywords = useState(() => config.keywords);

const meta = useState(() => config.meta as Record<string, string>[]);

useHead({
    title: config.title,
    meta: [
        { name: "description", content: `${hitokoto.value}\n${description.value}` },
        { hid: "keywords", name: "keywords", content: keywords.value.join(", ") },
        ...meta.value,
    ],
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
</script>
