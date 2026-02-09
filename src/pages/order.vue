<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { useRoute } from "vue-router";
import { OrderMainBlock } from "@/components/order/order-main-block";
import { useRefreshPageProvider } from "@/composables/use-refresh-page-provider.ts";
import DefaultPage from "@/layouts/default-page.vue";
import { computed, ref } from "vue";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

const { pageKey, refreshPageKey } = useRefreshPageProvider();
const { refresh } = useRefreshPage([], () => refreshPageKey());

const route = useRoute();

const orderTitle = ref("");
const handleChangeTitle = (value: string) => {
  orderTitle.value = value;
};
const orderTitleLoading = computed(() => !orderTitle.value);

const orderId = route.params.orderId as string;
</script>

<template>
  <ion-page class="order-page">
    <ion-header :translucent="true">
      <base-toolbar>
        <default-layout-header :title="orderTitle" :loading="orderTitleLoading" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refresh">
      <base-island-block :clickable="false">
        <default-page>
          <order-main-block :order-id="orderId" :key="pageKey" @get-label="handleChangeTitle" />
        </default-page>
      </base-island-block>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.order-page {
}
</style>
