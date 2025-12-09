<script setup lang="ts">
import BaseFilterHeader from "@/components/base/base-filter/base-filter-header.vue";
import { useOrdersMineHeaderQuery } from "@/api/orders/order-mine-header.ts";
import { useQuery } from "@tanstack/vue-query";
import type { FilterType } from "../../../../types/FilterType.ts";
import type { SortType } from "../../../../types/SortType.ts";
import { ref, watch } from "vue";

const props = defineProps<{
  params: {
    tabName?: string;
    lng?: string;
  };
}>();

const sortValues = [
  {
    label: "Сначала новые",
    value: "createdAt#new",
  },
  {
    label: "Сначала старые",
    value: "createdAt#old",
  },
];

const headerOptions = useOrdersMineHeaderQuery(props.params);
const { data, suspense } = useQuery(headerOptions);

const filterModel = defineModel<FilterType[]>("filter", { required: true });
const sortModel = defineModel<SortType>("sort", { required: true });

const sortValue = ref("");

watch(sortValue, (value) => {
  if (value) {
    const value = sortValue.value.split("#")[0];
    const operator = sortValue.value.split("#")[1];

    sortModel.value = {
      ...sortModel.value,
      descending: operator === "new",
      sortBy: value,
    };
  }
});

await suspense();
</script>

<template>
  <base-filter-header
    v-model:filter="filterModel"
    v-model:sort="sortValue"
    :fields="data.tabheader"
    :sort-values="sortValues"
    class="application-filter"
  />
</template>

<style scoped lang="scss"></style>
