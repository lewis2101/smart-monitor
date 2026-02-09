<script setup lang="ts">
import BaseLiquidBlock from "@/components/base/base-liquid-block/base-liquid-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
</script>

<template>
  <base-liquid-block title="Мои документы">
    <div class="main-docs-block__content">
      <base-rect-item title="События" icon="article-person" rect-color="dark" />
      <base-rect-item title="Обучение" icon="article-person" rect-color="dark" />
      <base-rect-item title="Тесты" icon="article-person" rect-color="dark" />
      <base-rect-item title="KPI" icon="docs" rect-color="dark" />
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
