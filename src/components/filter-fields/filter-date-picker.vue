<script setup lang="ts">
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import { computed } from "vue";
import { formatDateString, parseDateString } from "@/utils/formatDate.ts";

const model = defineModel<string[] | null>();

const modelProxy = computed({
  get: () => {
    if (Array.isArray(model.value)) {
      return model.value.map((date) => parseDateString(date));
    }
    return model.value;
  },
  set: (value: Date[] | null) => {
    if (Array.isArray(value)) {
      model.value = value.filter(Boolean).map((date) => formatDateString(date));
    } else {
      model.value = value;
    }
  },
});
</script>

<template>
  <base-date-picker v-model="modelProxy" fluid selection-mode="range" clearable hide-on-range-selection />
</template>

<style scoped></style>
