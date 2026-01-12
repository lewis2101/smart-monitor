<script setup lang="ts">
import type {StepField} from "@/components/step-generator/types.ts";
import {computed, onMounted, ref, useTemplateRef, watch} from "vue";
import {
  useGlobalBackdropStore
} from "@/stores/use-global-backdrop-store/use-global-backdrop-store.ts";
import {formatDateString} from "@/utils/formatDate.ts";
import {useBubbleAnimate} from "@/composables/useBubbleAnimate.ts";
import type {
  DateCalcRestrictionResponse
} from "@/composables/apply-restrictions/date-time-picker-restiction.ts";
import BaseDatePicker from "@/components/base/base-date-picker/base-date-picker.vue";

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
}>()

const model = defineModel<string | null>({required: true});

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
      console.log("MODEL: ", model.value)
    }
  },
});

const dateTimeFieldRef = useTemplateRef("dateTimeFieldRef");
const globalBackdropStore = useGlobalBackdropStore();

const showModal = async () => {
  if (isDisabled.value) return;

  try {
    const date = (await globalBackdropStore.push("date-picker", {
      title: "Выберите дату",
      props: {
        showTime: true,
        minDate: props.restriction?.min && new Date(props.restriction?.min),
        maxDate: props.restriction?.max && new Date(props.restriction?.max),
        initialDate: proxyModel.value
      },
    })) as Date;

    proxyModel.value = date;
    emit("change");
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  useBubbleAnimate(dateTimeFieldRef);
})

const isDisabled = computed(() => props.disabled || props.field.disabled || props.loading);

watch(() => props.restriction, (value) => {
  if (!value) return;

  const minDate = new Date(value.min).getTime();
  const maxDate = new Date(value.max).getTime();
  const currentDate = new Date(model.value).getTime();

  if (currentDate < minDate || currentDate > maxDate) {
    model.value = new Date(minDate).toISOString();
  }
})

</script>

<template>
  <base-date-picker
    v-model="proxyModel"
    :placeholder="$t(field.value)"
    :loading="loading"
    :disabled="isDisabled"
    :show-time="true"
    @select-date="showModal"
  />
</template>

<style scoped lang="scss">
</style>
