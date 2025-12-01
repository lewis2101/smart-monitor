<script setup lang="ts">
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { OrdersScope } from "@/api/orders/orders-scope.ts";
import { ApplicationOrdersBlock } from "@/components/application/application-orders-block";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import BaseFilterHeader from "@/components/base/base-filter/base-filter-header.vue";

const { pageId, refresh } = useRefreshPage([OrdersScope.ordersMineHeader, OrdersScope.ordersMineView]);

const refreshPage = async (event: RefresherCustomEvent) => refresh(() => mockRefresh(event));
</script>

<template>
  <ion-page class="application-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header title="Мои заявки" />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher @refresh="refreshPage">
      <base-filter-header class="application-page__filter" />
      <div class="application-page__body" :key="pageId">
        <application-orders-block />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.application-page {
  &__filter {
    position: sticky;
    top: 0;
    left: 0;

    padding: 4px 24px;
  }

  &__body {
    padding: 16px 24px;
  }
}
</style>
