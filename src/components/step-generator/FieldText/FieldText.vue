<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseTextarea from "@/components/base/base-textarea/base-textarea.vue";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
    placeholder?: string;
  }>(),
  {
    disabled: false,
  },
);

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
  <base-textarea v-model="model" :placeholder="$t(field.value)" :disabled="disabled || field.disabled" />
</template>

<style scoped lang="scss"></style>
