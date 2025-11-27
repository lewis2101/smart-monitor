<script setup lang="ts">
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import ApplicationMenuBlock from "@/components/application/application-menu-block/application-menu-block.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { reactive } from "vue";
import { useOrdersMineHeaderQuery } from "@/api/orders/order-mine-header.ts";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { useOrdersMineViewQuery } from "@/api/orders/orders-mine-view.ts";
import { OrdersScope } from "@/api/orders/orders-scope.ts";

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

const headerParams = reactive({
  tabName: "!OrdersMine",
  lng: "rus",
});

const contentParams = reactive({
  paranoid: false,
  lang: "rus",
  sort: {
    descending: false,
    rowsPerPage: 100,
    page: 1,
  },
});

const headerOptions = useOrdersMineHeaderQuery(headerParams);
const contentOptions = useOrdersMineViewQuery(contentParams);

useQuery(headerOptions);
useQuery(contentOptions);
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
        <application-menu-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  &__body {
    padding: 16px 8px;
  }
}
</style>
