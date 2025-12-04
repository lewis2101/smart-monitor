<script setup lang="ts">
import { IonPage, IonHeader, type RefresherCustomEvent } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { mockRefresh } from "@/utils/mockRefresh.ts";
import { OrdersScope } from "@/api/orders/orders-scope.ts";
import { ApplicationOrdersBlock } from "@/components/application/application-orders-block";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import { reactive, ref } from "vue";
import { ApplicationFilter } from "@/components/application/application-filter";
import type { FilterType } from "../../types/FilterType.ts";

const { pageId, refresh } = useRefreshPage([OrdersScope.ordersMineHeader, OrdersScope.ordersMineView]);

const headerParams = reactive({
  tabName: "!OrdersMine",
  lng: "rus",
});

const filter = reactive<FilterType[]>([]);

const contentParams = reactive({
  paranoid: false,
  lang: "rus",
  sort: {
    descending: false,
    rowsPerPage: 100,
    page: 1,
  },
  where: filter,
});

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
      <div class="application-page__filter">
        <application-filter v-model="filter" :params="headerParams" />
      </div>
      <div class="application-page__body" :key="pageId">
        <application-orders-block :params="contentParams" />
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
