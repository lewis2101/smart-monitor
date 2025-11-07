<script setup lang="ts">
import GlobalBackdrops from "@/widgets/global-backdrops.vue";
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import GlobalSpinner from "@/widgets/global-spinner.vue";
</script>

<template>
  <ion-app>
    <ion-router-outlet />
    <global-spinner />
    <global-backdrops />
  </ion-app>
</template>

<style scoped></style>
