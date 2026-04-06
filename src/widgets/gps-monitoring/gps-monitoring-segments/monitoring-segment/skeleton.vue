<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <div class="monitoring-segment">
    <base-island-block skeleton-title :clickable="false" class="monitoring-segment__block">
      <base-island-block v-for="i in 8" :key="i" class="monitoring-segment__block-item">
        <div class="monitoring-segment__item-wrapper">
          <div class="monitoring-segment__item-content">
            <div class="monitoring-segment__item-title">
              <ion-skeleton-text animated />
            </div>
            <div class="monitoring-segment__item-location">
              <ion-skeleton-text animated />
            </div>
            <div class="monitoring-segment__item-location">
              <ion-skeleton-text animated />
            </div>
          </div>
          <div class="monitoring-segment__item-menu">
            <ion-skeleton-text animated />
          </div>
        </div>
      </base-island-block>
    </base-island-block>

    <base-island-block skeleton-title :clickable="false" class="monitoring-segment__block">
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.monitoring-segment {
  &__block-item {
    padding: 20px;
  }

  &__item-content {
    flex-grow: 1;
  }

  &__item-title {
    ion-skeleton-text {
      width: 150px;
      height: 16px;
      border-radius: 24px;
    }

    display: flex;
    align-items: center;
    gap: 6px;

    margin-bottom: 8px;
  }

  &__item-location {
    ion-skeleton-text {
      width: 220px;
      height: 14px;
      border-radius: 24px;
    }

    margin-bottom: 4px;
  }

  &__item-menu {
    ion-skeleton-text {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }

  &__item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
