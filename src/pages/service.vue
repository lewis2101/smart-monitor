<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
</script>

<template>
  <ion-page class="service-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Сервисы" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher>
      Service
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.service-page {
  padding-top: env(safe-area-inset-top);
}
</style>
