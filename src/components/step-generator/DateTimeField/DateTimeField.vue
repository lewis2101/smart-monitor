<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import { computed, onMounted, ref, watch } from "vue";
import { useGlobalBackdropStore } from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import type { DateCalcRestrictionResponse } from "@/composables/apply-restrictions/date-time-picker-restiction.ts";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";
import { useBubbleAnimate } from "@/composables/useBubbleAnimate.ts";

const props = withDefaults(
  defineProps<{
    field: StepField;
    disabled?: boolean;
    restriction?: DateCalcRestrictionResponse;
    loading?: boolean;
  }>(),
  {
    disabled: false,
    loading: false,
  },
);

const emit = defineEmits<{
  (e: "change"): void;
}>();

const model = defineModel<string | null>({ required: true });
const dateTimeFieldRef = ref<HTMLDivElement | null>(null);

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

const globalBackdropStore = useGlobalBackdropStore();

const showModal = async () => {
  if (isDisabled.value) return;

  try {
    const date = (await globalBackdropStore.push("date-picker", {
      title: "Выберите дату",
      props: {
        showTime: true,
        minDate: props.restriction?.min ? new Date(props.restriction?.min) : undefined,
        maxDate: props.restriction?.max ? new Date(props.restriction?.max) : undefined,
        minTime: props.restriction?.timeStart,
        maxTime: props.restriction?.timeEnd,
        initialDate: proxyModel.value,
      },
    })) as Date;

    proxyModel.value = date;
    emit("change");
  } catch (e) {
    console.log(e);
  }
};

onMounted(() => {
  useBubbleAnimate(dateTimeFieldRef, () => props.disabled);
});

const isDisabled = computed(() => props.disabled || props.field.disabled || props.loading);

watch(
  () => props.restriction,
  (value) => {
    if (!value || !model.value) return;

    const minDate = new Date(value.min).getTime();
    const maxDate = new Date(value.max).getTime();
    const currentDate = new Date(model.value).getTime();

    if (currentDate < minDate || currentDate > maxDate) {
      model.value = new Date(minDate).toISOString();
    }
  },
);
</script>

<template>
  <div class="dateTimeFieldRef">
    <base-date-picker
      v-model="proxyModel"
      :placeholder="$t(field.value)"
      :loading="loading"
      :disabled="isDisabled"
      :show-time="true"
      @select-date="showModal"
    />
  </div>
</template>

<style scoped lang="scss"></style>
