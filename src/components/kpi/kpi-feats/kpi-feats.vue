<script setup lang="ts">
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="kpi-feats">
    <base-island-block class="kpi-feats__item" :clickable="false">
      <div class="kpi-feats__point">
        <base-icon name="point" />
      </div>
      <div class="kpi-feats__title">Цель мес.</div>
      <div class="kpi-feats__description">100%</div>
    </base-island-block>
    <base-island-block class="kpi-feats__item" :clickable="false">
      <div class="kpi-feats__bonus">
        <base-icon name="medal" />
      </div>
      <div class="kpi-feats__title">Бонус</div>
      <div class="kpi-feats__description">+15%</div>
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

  &__bonus,
  &__point {
    width: 40px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
  }

  &__bonus {
    color: #fe9a00;
    background: #fffbeb;
  }

  &__point {
    color: #2b7fff;
    background: #eff6ff;
  }

  &__title {
    color: $gray-dark;
    font-weight: bold;
  }

  &__description {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
