<script setup lang="ts">
import GlobalBackdrops from "@/widgets/global-backdrops.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import GlobalSpinner from "@/widgets/global-spinner.vue";
import { nextTick, onMounted } from "vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";
import { useLangStorage } from "@/composables/use-lang-storage.ts";

const { initRouteWatch } = useStatusBarColor();
initRouteWatch();

const { initLocaleLang } = useLangStorage();
initLocaleLang();

onMounted(async () => {
  await nextTick();
  setTimeout(async () => {
    await SplashScreen.hide();
  }, 1000);
});
</script>

<template>
  <ion-app>
    <ion-router-outlet />
    <prime-toast
      position="bottom-center"
      :pt="{
        root: $style['global-toast'],
        message: $style.message,
        messageContent: $style.messageContent,
      }"
      class="global-toast"
    />
    <global-spinner />
    <global-backdrops />
  </ion-app>
</template>

<style module lang="scss">
.global-toast {
  margin-bottom: calc(env(safe-area-inset-bottom) + 42px);
  z-index: 99999 !important;
}
.message {
  margin: 0 auto !important;
  max-width: 320px;
  background: #ffffff !important;
  box-shadow: 0 8px 16px 0 #00000014 !important;
  border: 1px solid #f2f2f7 !important;
  border-radius: 12px !important;
}

.messageContent {
  max-height: 200px;
  overflow-x: auto;
}
</style>

<style scoped lang="scss"></style>
