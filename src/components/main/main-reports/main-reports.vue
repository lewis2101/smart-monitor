<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
</script>

<template>
  <base-island-block title="Мои заявки" class="main-reports">
    <base-rect-item title="Черновики" rect-color="dark" />
    <base-rect-item title="Отправлено" rect-color="dark" />
    <base-rect-item title="Закрытые" rect-color="dark" />
    <base-rect-item title="Все" rect-color="dark" />
  </base-island-block>
</template>

<style lang="scss" scoped>
.main-reports {
  border: 1px solid #F2F2F7;

  &:deep(.base-island-block__content) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
