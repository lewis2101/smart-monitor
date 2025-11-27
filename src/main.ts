import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import { registerPrimeVue } from "@/plugins/register-prime-vue.ts";
import dependencyInjectionProvider from "@/plugins/dependency-injection-provider.ts";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { IonicVue } from "@ionic/vue";
import { useKeyboardStore } from "@/stores/use-keyboard-store/use-keyboard-store.ts";
import "@ionic/vue/css/core.css";
import "@/assets/main.scss";

const app = createApp(App);

registerPrimeVue(app);
app.use(dependencyInjectionProvider);
app.use(createPinia());

const { disableScroll } = useKeyboardStore();

const pwaElements = defineCustomElements(window);
const capacitorKeyboard = disableScroll();
await Promise.all([pwaElements, capacitorKeyboard]);

app.use(IonicVue, {
  mode: "ios",
});
app.use(router);
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        staleTime: Number.POSITIVE_INFINITY,
        retry: 0,
      },
    },
  },
});

app.mount("#app");
