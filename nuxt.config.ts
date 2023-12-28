// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  ssr: false,
  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "@vueuse/nuxt"],
  pinia: {
    storesDirs: ["./stores/**"]
  }
})