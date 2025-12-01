<template>
  <div class="base-filter-header">
    <base-island-block clickable>
      <div class="base-filter-header__filter-item">
        <base-icon name="filter" color="#2A61CC" />
        <div>Фильтр</div>
      </div>
    </base-island-block>
    <base-island-block clickable>
      <div class="base-filter-header__filter-item">
        <base-icon name="filter" color="#2A61CC" />
        <div>Сортировка</div>
      </div>
    </base-island-block>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<style scoped lang="scss">
.base-filter-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &__filter-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    font-size: 14px;
  }
}
</style>
