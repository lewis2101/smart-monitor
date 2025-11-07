import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import router from "./router";
import { registerPrimeVue } from "@/plugins/register-prime-vue.ts";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { IonicVue } from "@ionic/vue";
import { useKeyboard } from "@/composables/native/use-keyboard.ts";
import "@ionic/vue/css/core.css";
import "@/assets/main.scss";

const { disableScroll } = useKeyboard();

const pwaElements = defineCustomElements(window);
const capacitorKeyboard = disableScroll();

await Promise.all([pwaElements, capacitorKeyboard]);

const app = createApp(App);

registerPrimeVue(app);

app.use(createPinia());
app.use(IonicVue, {
  mode: "ios",
});
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
