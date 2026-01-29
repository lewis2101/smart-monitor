<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import { OrderMainBlock } from "@/components/order/order-main-block";
import { useRefreshPage } from "@/composables/use-refresh-page.ts";
import DefaultPage from "@/layouts/default-page.vue";

const { pageKey } = useRefreshPage();

const route = useRoute();

const orderId = route.params.orderId as string;
</script>

<template>
  <ion-page class="order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="`Заявка - ${orderId}`" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher :key="pageKey" @refresh="mockRefresh">
      <default-page>
        <order-main-block :order-id="orderId" />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.order-page {
}
</style>
