<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
await mockDelayPromise();
</script>

<template>
  <div class="briefing-score">
    <base-island-block class="briefing-score__wrapper" :clickable="false">
      <div class="briefing-score__item">
        <div class="briefing-score__title success">24</div>
        <div class="briefing-score__description">Всего</div>
      </div>
    </base-island-block>
    <base-island-block class="briefing-score__wrapper" :clickable="false">
      <div class="briefing-score__item">
        <div class="briefing-score__title process">8</div>
        <div class="briefing-score__description">Новые</div>
      </div>
    </base-island-block>
    <base-island-block class="briefing-score__wrapper" :clickable="false">
      <div class="briefing-score__item">
        <div class="briefing-score__title process">16</div>
        <div class="briefing-score__description">Прочитано</div>
      </div>
    </base-island-block>
  </div>
</template>

<style scoped lang="scss">
.briefing-score {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;

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
