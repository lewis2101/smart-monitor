<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import { ref } from "vue";

const props = defineProps<{
  field: StepField;
}>();

const getInitialValue = () => {
  if (typeof props.field.default === "string") {
    return props.field.default;
  }
  return "";
};

const model = ref(new Date(getInitialValue()));
</script>

<template>
  <base-date-picker v-model="model" :placeholder="field.text" :disabled="field.disabled" fluid />
</template>

<style scoped lang="scss"></style>
