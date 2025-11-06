<script setup lang="ts">
import { IonHeader, IonPage, IonToolbar } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="new-order-page__toolbar">
        <default-layout-header title="Новая заявка" close />
      </ion-toolbar>
    </ion-header>
    <base-content-with-refresher>
      Hello world
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.new-order-page {
  padding-top: env(safe-area-inset-top);

  &__toolbar {
    --padding-top: 0;
    --padding-bottom: 0;
  }

  &__body {
    padding: 16px 24px;
  }
}
</style>
