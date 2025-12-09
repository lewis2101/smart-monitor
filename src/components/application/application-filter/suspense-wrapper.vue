<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ApplicationFilter from "@/components/application/application-filter/application-filter.vue";
import Skeleton from "./skeleton.vue";
import type { FilterType } from "../../../../types/FilterType.ts";
import type { SortType } from "../../../../types/SortType.ts";

type Params = InstanceType<typeof ApplicationFilter>["$props"]["params"];

defineProps<{
  params: Params;
}>();

const filerModel = defineModel<FilterType[]>("filter", { required: true });
const sortModel = defineModel<SortType>("sort", { required: true });
</script>

<template>
  <error-boundary>
    <suspense>
      <application-filter v-bind="$attrs" :params v-model:filter="filerModel" v-model:sort="sortModel" />

      <template #fallback>
        <skeleton />
      </template>
    </suspense>

    <template #error> Произошла ошибка </template>
  </error-boundary>
</template>

<style scoped lang="scss"></style>
