<script setup lang="ts">
import Rating from "primevue/rating";
import type { StepField } from "@/components/step-generator/types.ts";
import { onMounted, ref } from "vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const ratingRef = ref<HTMLDivElement | null>(null);

const model = defineModel<number | null>({ required: true });

onMounted(() => {
  useBubbleAnimate(ratingRef);
});
</script>

<template>
  <div title="Оцените" class="rating-field">
    <div class="rating-field__title">Оцените</div>
    <div ref="ratingRef" class="rating-field__stars">
      <Rating v-model="model as number" :disabled="disabled || field.disabled" />
    </div>
  </div>
</template>

<style module lang="scss"></style>
<style scoped lang="scss">
.rating-field {
  padding: 12px;
  background: $white;
  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid #f2f2f7;
  border-radius: 12px;

  --p-rating-icon-active-color: #{$main-color};
  --p-rating-icon-hover-color: #{$main-color};
  --p-rating-icon-size: 2rem;
  --p-rating-gap: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;
    letter-spacing: 0;
    padding: 0 4px;
    margin-bottom: 16px;
  }
}
</style>
