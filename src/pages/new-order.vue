<script setup lang="ts">
import { IonHeader, IonPage, useIonRouter } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { MainTabRoutes } from "@/router/router-list.ts";
import { computed } from "vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import DefaultPage from "@/layouts/default-page.vue";
import NewOrderMainBlock from "@/components/order/new-order-main-block/new-order-main-block.vue";

const router = useIonRouter();
const route = useRoute();

const handleClickClose = () => {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace({ name: MainTabRoutes.home });
  }
};
const processKey = computed(() => route.params.processKey as string);
</script>

<template>
  <ion-page class="new-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header
          title="Новая заявка"
          back
          close
          @click-close="handleClickClose"
          @click-back="handleClickClose"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page>
        <new-order-main-block :process-key="processKey" />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.new-order-page {
}
</style>
