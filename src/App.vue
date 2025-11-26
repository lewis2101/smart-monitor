<script setup lang="ts">
import GlobalBackdrops from "@/widgets/global-backdrops.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import GlobalSpinner from "@/widgets/global-spinner.vue";
import { nextTick, onMounted } from "vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";

const { initRouteWatch } = useStatusBarColor();
initRouteWatch();

onMounted(async () => {
  await nextTick();
  await SplashScreen.hide();
});
</script>

<template>
  <ion-app>
    <ion-router-outlet />
    <global-spinner />
    <global-backdrops />
  </ion-app>
</template>

<style scoped></style>
