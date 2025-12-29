<script setup lang="ts">
import { onMounted, useTemplateRef } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const props = withDefaults(
  defineProps<{
    title?: string;
    clickable?: boolean;
  }>(),
  {
    clickable: true,
  },
);

const liquidBlockRef = useTemplateRef("liquidBlockRef");

onMounted(() => {
  if (props.clickable) {
    useBubbleAnimate(liquidBlockRef);
  }
});
</script>

<template>
  <div ref="liquidBlockRef" class="main-liquid-block">
    <div v-if="title" class="main-liquid-block__title">{{ title }}</div>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.main-liquid-block {
  color: $white;
  background: #ffffff33;
  border: 1px solid #ffffff33;
  border-radius: 24px;
  padding: 16px 8px;

  &__title {
    padding: 0 8px;
    font-size: 16px;
    font-weight: 600;
    line-height: 100%;
    letter-spacing: 0;
    margin-bottom: 16px;
  }
}
</style>
