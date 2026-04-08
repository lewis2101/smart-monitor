<script setup lang="ts">
import { IonPage, IonHeader } from "@ionic/vue";
import DefaultLayoutHeader from "@/components/layout/default-layout-header.vue";
import BaseToolbar from "@/components/base/base-toolbar/base-toolbar.vue";
import BaseContentWithRefresher from "@/components/base/base-content-with-refresher/base-content-with-refresher.vue";
import { Scopes } from "@/api/scopes.ts";
import { ApplicationOrdersBlock } from "@/components/application/application-orders-block";
import { useRefreshPage } from "@/composables/refresh-page.ts";
import { computed, reactive, ref } from "vue";
import { ApplicationFilter } from "@/components/application/application-filter";
import type { FilterType } from "../../types/FilterType.ts";
import type { SortType } from "../../types/SortType.ts";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { MainTabRoutes } from "@/router/router-list.ts";

const ordersTitleMap = {
  "!OrdersMine": "orders.header-title-my",
  "!Orders": "orders.header-title-all",
  AdminOrders: "orders.header-title-admin",
};

const route = useRoute();
const ordersType = route.params.ordersType as string;

const { pageId, refresh } = useRefreshPage(
  [Scopes.ordersMineHeader, Scopes.ordersMineView],
  () => (sort.value.page = 1),
);

const { locale } = useI18n();

const headerParams = reactive({
  tabName: ordersType,
  lng: "rus",
});

const filter = ref<FilterType[]>([]);
const sort = ref<SortType>({
  sortBy: undefined,
  descending: false,
  rowsPerPage: 10,
  page: 1,
});

const contentParams = reactive({
  paranoid: false,
  lang: locale.value,
  sort,
  where: filter,
});
</script>

<template>
  <ion-page class="orders-page">
    <ion-header>
      <base-toolbar>
        <default-layout-header
          :title="$t(ordersTitleMap?.[ordersType] || '')"
          :hide-back="route.name === MainTabRoutes.orders"
          :hide-close="route.name === MainTabRoutes.orders"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="orders-page__content" @refresh="refresh" variant="secondary">
      <div class="orders-page__filter">
        <application-filter v-model:filter="filter" v-model:sort="sort" :params="headerParams" />
      </div>
      <div class="orders-page__content">
        <application-orders-block v-model:params="contentParams" :key="pageId" :ordersType="ordersType" />
      </div>
    </base-content-with-refresher>
  </ion-page>
</template>

<style scoped lang="scss">
.orders-page {
  &__filter {
    position: sticky;
    top: 16px;
    left: 0;
    z-index: 1;
    background: $white;
  }

  &__content {
  }
}
</style>
