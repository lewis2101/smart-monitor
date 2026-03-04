<script setup lang="ts">
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import { IonHeader, IonPage } from "@ionic/vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import { MockOrderSteps } from "@/components/mock-orders";
import { computed } from "vue";

const route = useRoute();
const mockOrderStep = computed(() => route.query.mockOrderStep as string);

const orderId = Math.round(Math.random() * 1000) + 500;
</script>

<template>
  <ion-page class="mock-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="`Заявка - ${orderId}`" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh" variant="secondary">
      <mock-order-steps :order-step="mockOrderStep" :order-id="`${orderId}`" />
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.mock-order-page {
}
</style>
