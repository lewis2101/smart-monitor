<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { ServicesMenu } from "@/widgets/sevices-menu";
</script>

<template>
  <ion-page class="service-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Сервисы" hide-back hide-close />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <services-menu />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.service-page {
}
</style>
