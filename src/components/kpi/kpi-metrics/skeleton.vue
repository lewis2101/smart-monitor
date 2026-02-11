<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { IonSkeletonText } from "@ionic/vue";
</script>

<template>
  <div class="kpi-metrics">
    <div class="kpi-metrics__title">
      <ion-skeleton-text animated />
    </div>
    <base-island-block v-for="i in 4" :key="i" :clickable="false">
      <div class="kpi-metrics__item">
        <div class="kpi-metrics__item-content">
          <ion-skeleton-text animated />
          <div class="kpi-metrics__item-title">
            <ion-skeleton-text animated />
            <div class="green">
              <ion-skeleton-text animated />
            </div>
          </div>
        </div>
        <div class="kpi-metrics__item-value">
          <ion-skeleton-text animated />
        </div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.kpi-metrics {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__title {
    margin-top: 32px;
    margin-left: 8px;
    margin-bottom: 16px;

    ion-skeleton-text {
      width: 150px;
      height: 16px;
      border-radius: 24px;
    }
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }

  &__green,
  &__red {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  &__red {
    background: $danger;
  }

  &__green {
    background: $main-color;
  }

  &__item-content {
    display: flex;
    align-items: center;
    gap: 16px;

    & > ion-skeleton-text {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }
  }

  &__item-title {
    & > ion-skeleton-text {
      width: 100px;
      height: 12px;
      border-radius: 24px;
    }

    .green {
      margin-top: 8px;
      ion-skeleton-text {
        width: 120px;
        height: 12px;
        border-radius: 24px;
      }
    }
  }

  &__item-value {
    ion-skeleton-text {
      width: 50px;
      height: 30px;
      border-radius: 12px;
    }
  }
}
</style>
