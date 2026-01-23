<script setup lang="ts">
import { IonButton } from "@ionic/vue";
import DatePicker from "primevue/datepicker";
import { ref, watch } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import { useToast } from "primevue/usetoast";

const props = withDefaults(
  defineProps<
    {
      showTime?: boolean;
      minDate?: Date;
      maxDate?: Date;
      minTime?: number;
      maxTime?: number;
      initialDate?: Date | Date[] | null;
      selectionMode?: "single" | "range";
    } & BackdropComponentProps<(value: string | Date | Date[]) => void, (error: Error) => void>
  >(),
  {
    showTime: false,
    selectionMode: "single",
  },
);

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const pickerKey = ref(0);
const toast = useToast();

const getInitialValue = () => {
  if (props.selectionMode === "range") {
    if (Array.isArray(props.initialDate)) {
      return props.initialDate.map((date) => new Date(date));
    }
    return [];
  }
  if (props.initialDate) {
    return new Date(props.initialDate);
  }
  return new Date();
};

const model = ref(getInitialValue());

const submit = () => {
  if (!model.value) return;

  props.onSuccess?.(model.value);
  emit("closeBackdrop");
};

const showToastRestriction = () => {
  toast.add({
    summary: "Ошибка",
    severity: "error",
    detail: "Нельзя превысить ограничении по времени",
    life: 3000,
  });
};

watch(model, async (value) => {
  if (!value) return;
  if (Array.isArray(value)) return;

  const d = new Date(value);

  if (props.minTime && d.getHours() < props.minTime) {
    d.setHours(props.minTime);
    model.value = d;
    pickerKey.value++;
    showToastRestriction();
  }

  if (props.maxTime && d.getHours() > props.maxTime) {
    d.setHours(props.maxTime);
    model.value = d;
    pickerKey.value++;
    showToastRestriction();
  }
});
</script>

<template>
  <div class="date-picker-backdrop">
    <date-picker
      v-model="model"
      :key="pickerKey"
      :pt="{
        day: $style.day,
        month: $style.month,
        year: $style.year,
        panel: $style.panel,
        pcInputText: $style.inputText,
        hourPicker: $style.hourPicker,
        minutePicker: $style.minutePicker,
        separatorContainer: $style.separator,
      }"
      date-format="dd.mm.yy"
      :show-time="showTime"
      :min-date="minDate"
      :max-date="maxDate"
      fluid
      inline
      class="date-picker-backdrop__native"
      :selection-mode="selectionMode"
      :step-minute="10"
    />
    <ion-button class="date-picker-backdrop__button" @click="submit">Выбрать</ion-button>
  </div>
</template>

<style lang="scss" module>
.day {
  --p-datepicker-date-selected-background: #2a61cc;
  --p-datepicker-date-range-selected-background: #2a61cc;
  --p-datepicker-date-range-selected-color: #ffffff;
}

.month {
  --p-datepicker-date-selected-background: #2a61cc;
}

.year {
  --p-datepicker-date-selected-background: #2a61cc;
}

.panel {
  //min-width: auto !important;
  //width: auto !important;
}

.inputText {
  color: #151515;
}

.hourPicker,
.minutePicker {
  --p-icon-size: 30px !important;
  span {
    font-size: 1.5rem !important;
  }
}

.separator {
  span {
    font-size: 1.5rem !important;
    margin: 0 8px;
  }
}
</style>

<style scoped lang="scss">
.date-picker-backdrop {
  padding-bottom: env(safe-area-inset-bottom);
  &__button {
    width: 100%;
    padding: 8px 16px;
  }

  &__native {
    &:deep(.p-datepicker-dropdown) {
      box-shadow: 0px 2px 3px 0px #0000001a !important;
    }

    &:deep(input) {
      width: 100%;
      padding-inline-start: 16px;
      padding-inline-end: 16px;
      padding-top: 20px;
      padding-bottom: 12px;
      box-shadow: 0px 2px 3px 0px #0000001a !important;

      max-height: 50.5px;
    }
  }
}
</style>
