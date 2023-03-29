// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    modules: ['@vite-pwa/nuxt'],
    // devServer: {
    //     port: 7541,
    // },
    // ssr: false,
})
