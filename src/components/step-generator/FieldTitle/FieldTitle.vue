<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";
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

const model = defineModel<string>();
const fieldTitleRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  useBubbleAnimate(fieldTitleRef, () => props.disabled);
});
</script>

<template>
  <div v-if="model" class="field-title" ref="fieldTitleRef">
    <base-icon name="help" class="field-title__icon" />
    {{ model }}
  </div>
</template>

<style scoped lang="scss">
.field-title {
  padding: 12px 16px;

  box-shadow: 0px 2px 3px 0px #0000001a;
  border: 1px solid var(--System-Gray-Light, #f2f2f7);
  border-radius: 12px;
  color: $main-color;
  font-size: 14px;
  font-weight: 600;
  opacity: 0.8;
  display: flex;
  align-items: center;
  gap: 8px;

  text-wrap: pretty;

  &__icon {
    flex-shrink: 0;
  }
}
</style>
