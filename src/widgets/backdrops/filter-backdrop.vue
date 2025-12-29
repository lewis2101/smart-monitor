<script setup lang="ts">
import BaseInput from "@/components/base/base-input/base-input.vue";
import { IonButton } from "@ionic/vue";
import type { FieldInputType, FieldType } from "../../../types/FieldType.ts";
import type { FilterType } from "../../../types/FilterType.ts";
import { ref } from "vue";
import type { BackdropComponentProps } from "@/stores/use-global-backdrop-store/global-backdrop-config.ts";
import FilterDatePicker from "@/components/filter-fields/filter-date-picker.vue";
import { useI18n } from "vue-i18n";

const operatorMap: Record<string, string> = {
  DATE_TIME: "=",
  DATE: "=",
};

const props = defineProps<
  {
    fields: FieldType[];
    initialValue: FilterType[];
  } & BackdropComponentProps<(values: FilterType[]) => any>
>();

const emit = defineEmits<{
  (e: "closeBackdrop"): void;
}>();

const { t } = useI18n();

const getInitialValues = (sync = false): Record<string, FilterType> =>
  props.fields.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.value]: {
        operator: operatorMap?.[curr.filterType] || "like",
        value: curr.value,
        text: sync ? props.initialValue.find((v) => v.value === curr.value)?.text || "" : "",
      },
    }),
    {},
  );

const temporaryModel = ref<Record<string, FilterType>>(getInitialValues(true));

const submit = () => {
  const values: FilterType[] = [];

  Object.values(temporaryModel.value).forEach((field) => {
    if (field.text) {
      values.push(field);
    }
  });

  props.onSuccess?.(values);
  emit("closeBackdrop");
};

const reset = () => {
  temporaryModel.value = getInitialValues();
};

const getComponent = (type: FieldInputType) => {
  if (type === "DATE_TIME" || type === "DATE") {
    return FilterDatePicker;
  }
  return BaseInput;
};
</script>

<template>
  <div class="base-filter">
    <component
      v-for="field in fields"
      :is="getComponent(field.type)"
      v-model="temporaryModel[field.value]!.text as any"
      :key="field.value"
      class="base-filter__item"
      :placeholder="field.local?.rus || t(field.value)"
      clearable
    />
    <div class="base-filter__buttons">
      <ion-button fill="outline" class="base-filter__button" @click="reset">Сбросить</ion-button>
      <ion-button class="base-filter__button" @click="submit">Применить</ion-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-filter {
  padding: 8px 16px 0 16px;

  &__item {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__buttons {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 8px 0;
    background: $white;

    margin-top: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__button {
    width: 100%;
  }
}
</style>
