<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <div class="base-filter-skeleton">
    <base-island-block>
      <div class="base-filter-header__filter-item">
        <ion-skeleton-text animated class="base-filter-skeleton__skeleton" />
      </div>
    </base-island-block>
    <base-island-block>
      <div class="base-filter-header__filter-item">
        <ion-skeleton-text animated class="base-filter-skeleton__skeleton" />
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.base-filter-skeleton {
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

  &__skeleton {
    width: 100%;
    height: 20px;
    border-radius: 12px;
  }
}
</style>
