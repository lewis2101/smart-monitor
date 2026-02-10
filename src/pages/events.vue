<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
</script>

<template>
  <ion-page class="service-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="События" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <div class="events">
        <div class="events__title">Последние обновления и происшествия на объекте</div>
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.service-page {
}
.events {
  &__title {
    font-weight: bold;
  }
}
</style>
