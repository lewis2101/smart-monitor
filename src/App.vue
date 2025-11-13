<script setup lang="ts">
import GlobalBackdrops from "@/widgets/global-backdrops.vue";
import { IonApp, IonRouterOutlet, useIonRouter } from "@ionic/vue";
import GlobalSpinner from "@/widgets/global-spinner.vue";
import { nextTick, onMounted } from "vue";
import { SplashScreen } from "@capacitor/splash-screen";
import { CommonRoutes } from "@/router/router-list.ts";
import { useStatusBarColor } from "@/composables/native/use-status-bar-color.ts";

const router = useIonRouter();
const { initRouteWatch } = useStatusBarColor();
initRouteWatch();

onMounted(async () => {
  router.replace({
    name: CommonRoutes.login,
  });
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
