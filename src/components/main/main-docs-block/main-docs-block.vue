<script setup lang="ts">
import BaseLiquidBlock from "@/components/base/base-liquid-block/base-liquid-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
import { mockDelayPromise } from "@/utils/mockDelayPromise.ts";
import { useIonRouter } from "@ionic/vue";
import { CommonRoutes, MainTabRoutes } from "@/router/router-list.ts";

const router = useIonRouter();

await mockDelayPromise();
</script>

<template>
  <base-liquid-block title="Основные" :clickable="false">
    <div class="main-docs-block__content">
      <base-rect-item
        title="События"
        icon="events"
        rect-color="dark"
        clickable
        @click="router.push({ name: CommonRoutes.events })"
      />
      <base-rect-item
        title="Обучение"
        icon="learning"
        rect-color="dark"
        clickable
        @click="router.push({ name: CommonRoutes.learning })"
      />
      <base-rect-item
        title="Материалы"
        icon="folder"
        rect-color="dark"
        clickable
        @click="router.push({ name: MainTabRoutes.briefing })"
      />
      <base-rect-item
        title="KPI"
        icon="stats"
        rect-color="dark"
        clickable
        @click="router.push({ name: CommonRoutes.kpi })"
      />
    </div>
  </base-liquid-block>
</template>

<style lang="scss" scoped>
.main-docs-block__content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0 4px;
}
</style>
