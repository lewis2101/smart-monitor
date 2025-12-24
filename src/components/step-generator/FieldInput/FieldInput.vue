<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import type { StepField } from "@/components/step-generator/types.ts";

const props = defineProps<{
  field: StepField;
}>();

const getInitialValue = () => {
  if (typeof props.field.default === "string") {
    return props.field.default;
  }
  return "";
};

const model = defineModel<string>({ required: true });
model.value = getInitialValue();
</script>

<template>
  <div class="field-input">
    <base-input v-model="model" :placeholder="$t(field.value)" :disabled="field.disabled" />
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
