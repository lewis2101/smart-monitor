<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";

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
    return new Date(props.field.default);
  }
  return null;
};

const model = defineModel<Date | null>({ required: true });
model.value = getInitialValue();
</script>

<template>
  <base-date-picker v-model="model" :placeholder="field.text" :disabled="disabled || field.disabled" fluid />
</template>

<style scoped lang="scss"></style>
