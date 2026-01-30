<script setup lang="ts">
import { IonHeader, IonPage } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { computed, ref } from "vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useRoute } from "vue-router";
import DefaultPage from "@/layouts/default-page.vue";
import { NewOrderMainBlock } from "@/components/order/new-order-main-block";

const route = useRoute();

const orderTitle = ref("");
const handleChangeTitle = (value: string) => {
  orderTitle.value = value;
};
const orderTitleLoading = computed(() => !orderTitle.value);
const processKey = computed(() => route.params.processKey as string);
</script>

<template>
  <ion-page class="new-order-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header :title="orderTitle" :loading="orderTitleLoading" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="mockRefresh">
      <default-page>
        <new-order-main-block :process-key="processKey" @get-label="handleChangeTitle" />
      </default-page>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.new-order-page {
}
</style>
