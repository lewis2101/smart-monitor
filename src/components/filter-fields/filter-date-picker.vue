<script setup lang="ts">
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import {computed} from "vue";
import {formatDateString, parseDateString} from "@/utils/formatDate.ts";
import {
  useGlobalBackdropStore
} from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";

const model = defineModel<string[] | null>();

const globalBackdropStore = useGlobalBackdropStore();

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

const selectDate = async () => {
  try {
    const result = await globalBackdropStore.push("date-picker", {
      title: "Выберите дату",
      props: {
        initialDate: modelProxy.value ? modelProxy.value : null,
        selectionMode: "range"
      }
    })
    modelProxy.value = result;
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <base-date-picker v-model="modelProxy" clearable @select-date="selectDate"/>
</template>

<style scoped></style>
