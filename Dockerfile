FROM node:20-slim

WORKDIR /app
COPY .output .

ENV NUXT_TITLE = "Example's Main Page"

ENV NUXT_OWNER_EMAIL="example@example.com"
ENV NUXT_OWNER_NAME="Example"
ENV NUXT_DESCRIPTION="Welcome to Example's main page"

ENV NUXT_HITOKOTO_URL="https://v1.hitokoto.cn"
ENV NUXT_GRAVATAR_URL="https://gravatar.com"

ENV NUXT_PUBLIC_LINKS='{"blog":"https://blog.example.com","forum":"https://forum.example.com"}'
ENV NUXT_PUBLIC_SOCIALS='{"github":{"link":"https://github.com/","icon":"fa-brands fa-github"},"bilibili":{"link":"https://www.bilibili.com/","icon":"fa-brands fa-bilibili"},"email":{"link":"mailto:example@example.com","icon":"fa-solid fa-envelope"}}'

EXPOSE 3000

ENTRYPOINT [ "node" ,"server/index.mjs" ]