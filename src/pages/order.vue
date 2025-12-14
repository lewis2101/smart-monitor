<script setup lang="ts">
import { IonPage, IonHeader, useIonRouter } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import { MainTabRoutes } from "@/router/router-list.ts";

const route = useRoute();
const router = useIonRouter();

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};
</script>

<template>
  <ion-page class="order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="`Заявка - ${route.params.uuid}`" close @click-close="handleClickClose" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh"> ORDER </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.order-page {
}
</style>
