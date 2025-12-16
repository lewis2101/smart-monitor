<script setup lang="ts">
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";
import BaseRectItem from "@/components/base/base-rect-item/base-rect-item.vue";
import { useIonRouter } from "@ionic/vue";

const router = useIonRouter();
</script>

<template>
  <base-island-block title="Мои заявки" class="main-reports" :clickable="false">
    <base-rect-item title="Черновики" rect-color="dark" icon="layer" />
    <base-rect-item title="Отправлено" rect-color="dark" icon="check" />
    <base-rect-item title="Закрытые" rect-color="dark" icon="check-all" />
    <base-rect-item title="Все" rect-color="dark" icon="checklist" @click="router.push('/application')" />
  </base-island-block>
</template>

<style lang="scss" scoped>
.main-reports {
  border: 1px solid #f2f2f7;

  &:deep(.base-island-block__content) {
    width: 100%;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
