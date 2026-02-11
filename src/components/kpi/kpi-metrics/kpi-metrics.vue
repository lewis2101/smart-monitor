<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";

await mockDelayPromise();
</script>

<template>
  <div class="kpi-metrics">
    <div class="kpi-metrics__title">Детальные метрики</div>
    <base-island-block :clickable="false">
      <div class="kpi-metrics__item">
        <div class="kpi-metrics__item-content">
          <div class="kpi-metrics__green" />
          <div class="kpi-metrics__item-title">
            <div>Безопасность (HSE)</div>
            <div class="green">+2.4%</div>
          </div>
        </div>
        <div class="kpi-metrics__item-value">98%</div>
      </div>
    </base-island-block>
    <base-island-block :clickable="false">
      <div class="kpi-metrics__item">
        <div class="kpi-metrics__item-content">
          <div class="kpi-metrics__green" />
          <div class="kpi-metrics__item-title">
            <div>Производительность</div>
            <div class="green">+5.1%</div>
          </div>
        </div>
        <div class="kpi-metrics__item-value">104%</div>
      </div>
    </base-island-block>
    <base-island-block :clickable="false">
      <div class="kpi-metrics__item">
        <div class="kpi-metrics__item-content">
          <div class="kpi-metrics__red" />
          <div class="kpi-metrics__item-title">
            <div>Дисциплина</div>
            <div class="red">-1.2%</div>
          </div>
        </div>
        <div class="kpi-metrics__item-value">92%</div>
      </div>
    </base-island-block>
    <base-island-block :clickable="false">
      <div class="kpi-metrics__item">
        <div class="kpi-metrics__item-content">
          <div class="kpi-metrics__green" />
          <div class="kpi-metrics__item-title">
            <div>Качество работ</div>
            <div class="green">0%</div>
          </div>
        </div>
        <div class="kpi-metrics__item-value">100%</div>
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
    font-weight: bold;
    font-size: 18px;
    margin-left: 8px;
    margin-bottom: 16px;
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
  }

  &__item-title {
    font-size: 14px;
    font-weight: bold;

    .green,
    .red {
      margin-top: 8px;
      font-weight: bold;
      font-size: 12px;
    }

    .green {
      color: $main-color;
    }

    .red {
      color: $danger;
    }
  }

  &__item-value {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
