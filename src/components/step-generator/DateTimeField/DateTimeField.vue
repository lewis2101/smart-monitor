<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import { computed } from "vue";

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
    return new Date(props.field.default).toISOString();
  }
  return null;
};

const model = defineModel<string | null>({ required: true });
model.value = getInitialValue();

const proxyModel = computed({
  get: () => {
    if (model.value) {
      return new Date(model.value);
    }
    return null;
  },
  set: (value: Date) => {
    if (value) {
      model.value = value.toISOString();
    }
  },
});
</script>

<template>
  <base-date-picker v-model="proxyModel" :placeholder="$t(field.value)" :disabled="disabled || field.disabled" fluid />
</template>

<style scoped lang="scss"></style>
