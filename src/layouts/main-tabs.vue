<script setup lang="ts">
import MainFooter from "@/components/main/main-footer/main-footer.vue";
import { IonRouterOutlet, IonTabs, IonPage } from "@ionic/vue";
</script>

<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />
      <main-footer />
    </ion-tabs>
  </ion-page>
</template>

<style lang="scss" scoped></style>
