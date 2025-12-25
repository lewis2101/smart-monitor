<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import type { StepField } from "@/components/step-generator/types.ts";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const getInitialValue = () => {
  if (typeof props.field.default === "string") {
    return props.field.default;
  }
  return null;
};

const model = defineModel<string | null>({ required: true });
model.value = getInitialValue();
</script>

<template>
  <div class="field-input">
    <base-input v-model="model" :placeholder="$t(field.value)" :disabled="disabled || field.disabled" />
  </div>
</template>

<style scoped lang="scss">
.field-input {
  position: relative;

  &__spinner {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);

    &-icon {
      color: $main-color;
    }
  }
}
</style>
