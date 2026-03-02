<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
</script>

<template>
  <div class="process-list-backdrop">
    <base-island-block v-for="i in 5" :key="i" class="process-list-backdrop__wrapper">
      <div class="process-list-backdrop__item">
        <div class="process-list-backdrop__start">
          <div :class="['process-list-backdrop__icon']">
            <ion-skeleton-text animated />
          </div>
          <div class="process-list-backdrop__content">
            <div class="process-list-backdrop__title">
              <ion-skeleton-text animated />
            </div>
            <div class="process-list-backdrop__description">
              <ion-skeleton-text animated />
            </div>
          </div>
        </div>
        <div class="process-list-backdrop__end">
          <ion-skeleton-text animated />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.process-list-backdrop {
  padding: 8px 8px calc(8px + env(safe-area-inset-bottom)) 8px;

  &__wrapper {
    padding: 16px;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .success {
      background: $secondary-color;
      color: $white;
    }

    .warning {
      background: #f54a00;
      color: $white;
    }

    .info {
      background: #4f39f6;
      color: $white;
    }
  }

  &__start {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__end {
    width: 32px;
    height: 32px;
    background: $gray-light;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &__icon {
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  &__title {
    font-size: 14px;
    font-weight: bold;
    width: 160px;
    border-radius: 24px;
  }

  &__description {
    margin-top: 4px;
    font-size: 12px;
    width: 70px;
    border-radius: 24px;
    color: $gray-dark;
  }
}
</style>
