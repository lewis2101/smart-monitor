<script setup lang="ts">
import Rating from "primevue/rating";
import type { StepField } from "@/components/step-generator/types.ts";
import BaseIslandBlock from "@/components/base/base-island-block/base-island-block.vue";

defineProps<{
  field: StepField;
}>();

const model = defineModel<number>({ required: true });
</script>

<template>
  <base-island-block title="Оцените" class="rating-field">
    <Rating v-model="model" />
  </base-island-block>
</template>

<style module lang="scss"></style>
<style scoped lang="scss">
.rating-field {
  --p-rating-icon-active-color: #{$main-color};
  --p-rating-icon-hover-color: #{$main-color};
  --p-rating-icon-size: 1.5rem;
  --p-rating-gap: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
