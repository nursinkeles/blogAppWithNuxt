export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "blog-app",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
      },
      { rel: "icon", href: "<%= BASE_URL %>favicon.ico" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["balm-ui/dist/balm-ui.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/balm-ui"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // Yönlendirme Ayarları
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "blog-post",
        path: "/blog/:id",
        component: resolve(__dirname, "pages/blog/_id.vue"),
      });
    },
  },
};
