<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseIcon from "@/components/base/base-icon/base-icon.vue";

defineProps<{
  field: StepField;
}>();
</script>

<template>
  <div v-if="field.default" class="field-title">
    <base-icon name="help" :width="42" class="field-title__icon" />
    {{ field.default }}
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
  align-items: start;
  justify-content: space-between;
  gap: 8px;

  text-wrap: pretty;

  &__icon {
    svg {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
