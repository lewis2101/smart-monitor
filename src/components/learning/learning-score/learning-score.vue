<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="learning-score">
    <base-island-block class="learning-score__wrapper" :clickable="false">
      <div class="learning-score__item">
        <div class="learning-score__title success">12</div>
        <div class="learning-score__description">Пройдено</div>
      </div>
    </base-island-block>
    <base-island-block class="learning-score__wrapper" :clickable="false">
      <div class="learning-score__item">
        <div class="learning-score__title process">2</div>
        <div class="learning-score__description">Пройдено</div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.learning-score {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 32px;

  &__wrapper {
    padding: 16px;
  }

  &__item {
    .success {
      color: $main-color;
    }
    .process {
      color: #155dfc;
    }
  }

  &__title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 8px;
  }

  &__description {
    font-size: 14px;
    color: #90a1b9;
    font-weight: bold;
  }
}
</style>
