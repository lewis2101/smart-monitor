<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="kpi-score">
    <div class="kpi-score__title">
      <base-icon name="star" />
      Отличный результат
    </div>
    <div class="kpi-score__value">96.4</div>
    <div class="kpi-score__description">Общий балл эффективности</div>
  </div>
</template>

<style scoped lang="scss">
.kpi-score {
  width: 100%;
  background: linear-gradient(75deg, #00786f, #00bc7d);
  color: $white;
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
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;

    display: flex;
    align-items: center;
    gap: 8px;

    span {
      width: 14px;
    }
  }

  &__value {
    font-size: 54px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  &__description {
    color: #d0fae5;
  }
}
</style>
