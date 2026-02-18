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

const route = useRoute();
const ordersType = computed(() => route.params.ordersType as string);

const { pageId, refresh } = useRefreshPage(
  [Scopes.ordersMineHeader, Scopes.ordersMineView],
  () => (sort.value.page = 1),
);

const { locale } = useI18n();

const headerParams = reactive({
  tabName: ordersType.value,
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
          :title="$t('orders.header-title')"
          :hide-back="route.name === MainTabRoutes.orders"
          :hide-close="route.name === MainTabRoutes.orders"
        />
      </base-toolbar>
    </ion-header>
    <base-content-with-refresher class="orders-page__content" @refresh="refresh" variant="secondary" :x-offset="false">
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
    top: 0;
    left: 0;
    z-index: 1;
    background: $white;

    padding: 16px 16px 0 16px;
  }

  &__content {
    padding: 16px;
  }
}
</style>
