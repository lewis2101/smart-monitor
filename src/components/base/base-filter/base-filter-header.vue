<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { computed, ref } from "vue";
import type { FieldType } from "../../../../types/FieldType.ts";
import type { FilterType } from "../../../../types/FilterType.ts";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const props = defineProps<{
  fields: FieldType[];
  sortValues: {
    label: string;
    value: string;
  }[];
}>();

const globalBackdropStore = useGlobalBackdropStore();

const filterModel = defineModel<FilterType[]>("filter", { required: true });
const sortModel = defineModel<string>("sort", { required: true });

const filterBackdropModel = ref(false);

const handleFilterClick = async () => {
  const values = (await globalBackdropStore.push("filter", {
    title: "Фильтр",
    props: {
      fields: props.fields,
      initialValue: filterModel.value,
    },
  })) as FilterType[];

  filterModel.value = values;
  filterBackdropModel.value = true;
};

const handleSortClick = async () => {
  const value = (await globalBackdropStore.push("select", {
    title: "Сортировка",
    props: {
      list: props.sortValues,
      initialValue: sortModel.value,
    },
  })) as string;

  sortModel.value = value;
};

const isActiveFilter = computed(() => filterModel.value.length > 0);
</script>

<template>
  <div class="base-filter-header">
    <base-island-block
      :class="['base-filter-header__filter', isActiveFilter && 'active']"
      clickable
      @click="handleFilterClick"
    >
      <div class="base-filter-header__filter-item">
        <base-icon name="filter" :color="isActiveFilter ? '#FFFFFF' : '#2A61CC'" />
        <div>Фильтр</div>
      </div>
    </base-island-block>
    <base-island-block class="base-filter-header__filter" clickable @click="handleSortClick">
      <div class="base-filter-header__filter-item">
        <base-icon name="sort" color="#2A61CC" />
        <div>Сортировка</div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.base-filter-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  .active {
    background: $main-color;
    color: $white;
  }

  &__filter-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 14px;
  }
}
</style>
