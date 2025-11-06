<script setup lang="ts">
import GlobalBackdrops from "@/widgets/global-backdrops.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
</script>

<template>
  <ion-app>
    <ion-router-outlet />
    <global-backdrops />
  </ion-app>
  <!--  <router-view />-->
</template>

<style scoped></style>
