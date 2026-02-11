<script setup lang="ts">
import { IonSkeletonText } from "@ionic/vue";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
</script>

<template>
  <div class="kpi-score">
    <div class="kpi-score__title">
      <ion-skeleton-text animated />
    </div>
    <div class="kpi-score__value">
      <ion-skeleton-text animated />
    </div>
    <div class="kpi-score__description">
      <ion-skeleton-text animated />
    </div>
  </div>
</template>

<style scoped lang="scss">
.kpi-score {
  width: 100%;
  background: linear-gradient(75deg, #00786f, #00bc7d);
  border-radius: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 32px;

  &__title {
    padding: 6px 16px;
    border-radius: 12px;
    background: #fff3;
    backdrop-filter: blur(10px);
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    gap: 8px;
    ion-skeleton-text {
      width: 150px;
      height: 16px;
      border-radius: 24px;
    }
  }

  &__value {
    margin-bottom: 8px;
    ion-skeleton-text {
      width: 100px;
      height: 70px;
      border-radius: 24px;
    }
  }

  &__description {
    ion-skeleton-text {
      width: 160px;
      height: 16px;
      border-radius: 24px;
    }
  }
}
</style>
