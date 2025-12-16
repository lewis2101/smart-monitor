<script setup lang="ts">
import DatePicker, { type DatePickerState } from "primevue/datepicker";
import { ref, useTemplateRef } from "vue";

defineProps<{
  placeholder?: string;
  errorText?: string;
  clearable?: boolean;
}>();

const datePickerRef = useTemplateRef<DatePickerState>("datePickerRef");

const model = defineModel<Date | Date[] | null>();

const isFocused = ref(false);

const handleFocus = () => {
  isFocused.value = true;
};

const handleBlur = () => {
  isFocused.value = false;
};
</script>

<template>
  <label class="base-date-picker">
    <div class="base-date-picker__wrapper">
      <div
        v-if="placeholder"
        :class="['base-date-picker__placeholder', (isFocused || model) && 'base-date-picker__placeholder_focus']"
      >
        {{ placeholder }}
      </div>
      <date-picker
        v-model="model"
        class="base-date-picker__native"
        ref="datePickerRef"
        :pt="{
          day: $style.day,
          month: $style.month,
          year: $style.year,
          panel: $style.panel,
        }"
        v-bind="$attrs"
        date-format="dd.mm.yy"
        appendTo="self"
        :show-on-focus="false"
        :show-icon="true"
        :show-clear="clearable"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div v-if="errorText" class="base-date-picker__error">{{ errorText }}</div>
  </label>
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
</style>

<style scoped lang="scss">
.base-date-picker {
  display: block;

  --p-inputtext-focus-ring-shadow: none;
  --p-inputtext-hover-border-color: #f2f2f7;
  --p-inputtext-focus-border-color: #f2f2f7;
  --p-inputtext-border-color: #f2f2f7;
  --p-inputtext-border-radius: 12px;

  --p-datepicker-dropdown-background: #ffffff;
  --p-datepicker-dropdown-border-color: #f2f2f7;

  &__wrapper {
    position: relative;
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

  &__placeholder {
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    z-index: 1;

    color: $txt-description;

    transition: all 0.2s ease;

    &_focus {
      font-size: 12px;
      top: 6px;
      left: 16px;
      transform: translate(0, 0);
    }
  }

  &__clear {
    position: absolute;
    z-index: 2;
    padding: 16px;
    right: 0;
    top: 0;
    margin-top: 0.3rem;
    color: #94a3b8;
  }

  &__error {
    color: $main-red;
    padding-top: 8px;
    padding-left: 16px;

    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    letter-spacing: 0;
  }
}
</style>
