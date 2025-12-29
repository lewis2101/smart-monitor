<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import DefaultPage from "@/layouts/default-page.vue";
</script>

<template>
  <ion-page class="service-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Сервисы" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page><div style="text-align: center">Страница в разработке</div> </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.service-page {
}
</style>
