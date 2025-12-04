<script setup lang="ts">
import BaseFilterHeader from "@/components/base/base-filter/base-filter-header.vue";
import { useOrdersMineHeaderQuery } from "@/api/orders/order-mine-header.ts";
import { useQuery } from "@tanstack/vue-query";
import type { FilterType } from "../../../../types/FilterType.ts";

const props = defineProps<{
  params: {
    tabName?: string;
    lng?: string;
  };
}>();

const headerOptions = useOrdersMineHeaderQuery(props.params);
const { data, suspense } = useQuery(headerOptions);

const model = defineModel<FilterType[]>({ required: true });

await suspense();
</script>

<template>
  <base-filter-header v-model:filter="model" :fields="data.tabheader" class="application-filter" />
</template>

<style scoped lang="scss"></style>
