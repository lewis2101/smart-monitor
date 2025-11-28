<script setup lang="ts">
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { useQueryClient } from "@tanstack/vue-query";
import { OrdersScope } from "@/api/orders/orders-scope.ts";
import { ApplicationOrdersBlock } from "@/components/application/application-orders-block";

const queryClient = useQueryClient();

const refreshPage = async (event: RefresherCustomEvent) => {
  const suspenseHeaders = queryClient.invalidateQueries({
    queryKey: [OrdersScope.ordersMineHeader],
  });
  const suspenseView = queryClient.invalidateQueries({
    queryKey: [OrdersScope.ordersMineView],
  });
  await Promise.all([suspenseHeaders, suspenseView]);
  mockRefresh(event);
};
</script>

<template>
  <ion-page class="application-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Мои заявки" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refreshPage">
      <div class="application-page__body">
        <application-orders-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  &__body {
    padding: 16px 24px;
  }
}
</style>
