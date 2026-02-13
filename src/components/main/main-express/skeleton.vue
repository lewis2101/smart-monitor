<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <base-island-block class="main-express" :clickable="false">
    <div class="title">
      <ion-skeleton-text animated />
    </div>
    <div class="main-express__wrapper">
      <div v-for="i in 4" :key="i" class="main-express__item">
        <div class="main-express__icon">
          <ion-skeleton-text animated />
        </div>
        <div class="main-express__title">
          <ion-skeleton-text animated />
        </div>
      </div>
    </div>
  </base-island-block>
</template>

<style scoped lang="scss">
.main-express {
  padding: 20px;

  .title ion-skeleton-text {
    width: 150px;
    height: 16px;
    border-radius: 24px;
    margin-bottom: 8px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  &__item {
    padding: 16px;
    color: $white;
    border-radius: 16px;

    background: $gray-light;

    min-width: 130px;
    min-height: 130px;
  }

  &__icon {
    display: flex;
    align-items: center;
    justify-content: center;

    background: $white;
    width: 48px;
    height: 48px;
    border-radius: 16px;
    margin-bottom: 8px;
    box-shadow: 0 0 24px 0 #00000014;
  }

  &__title {
    ion-skeleton-text {
      width: 70px;
      height: 16px;
      border-radius: 24px;
    }
  }
}
</style>
