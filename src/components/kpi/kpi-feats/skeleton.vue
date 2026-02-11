<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="kpi-feats">
    <base-island-block v-for="i in 2" :key="i" class="kpi-feats__item" :clickable="false">
      <div class="kpi-feats__point">
        <ion-skeleton-text animated />
      </div>
      <div class="kpi-feats__title">
        <ion-skeleton-text animated />
      </div>
      <div class="kpi-feats__description">
        <ion-skeleton-text animated />
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.kpi-feats {
  margin-top: 16px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  &__item {
    padding: 24px;
  }

  &__point {
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
  }

  &__title {
    ion-skeleton-text {
      width: 80px;
      height: 16px;
      border-radius: 24px;
    }
  }

  &__description {
    ion-skeleton-text {
      width: 60px;
      height: 16px;
      border-radius: 24px;
    }
  }
}
</style>
