<script setup lang="ts">
import BaseLiquidBlock from "@/components/base/base-liquid-block/base-liquid-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
import { useIonRouter } from "@ionic/vue";

const router = useIonRouter();
</script>

<template>
  <base-liquid-block title="Мои документы">
    <div class="main-docs-block__content">
      <base-rect-item title="Сертификаты" />
      <base-rect-item title="Техосмотры" />
      <base-rect-item title="Обучения" />
      <base-rect-item title="Все" @click="router.replace('/docs')" />
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
