<script setup lang="ts">
import { IonTextarea } from "@ionic/vue";
import type { StepField } from "@/components/step-generator/types.ts";

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
    return props.field.default;
  }
  return "";
};

const model = defineModel<string>({ required: true });
model.value = getInitialValue();
</script>

<template>
  <div class="field-text">
    <ion-textarea
      v-model="model"
      :placeholder="$t(field.value)"
      :disabled="field.disabled"
      label-placement="stacked"
      :class="['field-text__textarea', field.disabled && 'field-text-disabled']"
    />
  </div>
</template>

<style scoped lang="scss">
.field-text {
  &-disabled {
    color: #64748b !important;
  }

  &:deep(.textarea-disabled) {
    opacity: 1 !important;
  }

  &__textarea {
    --p-textarea-focus-border-color: $gray-light;
    border: 1px solid $gray-light;
    border-radius: 12px;
    box-shadow: 0 2px 3px 0 #0000001a;
    width: 100%;
    height: 100%;
    min-height: 150px;
    padding: 0 16px;
    margin-bottom: 16px;

    &::placeholder {
      color: $txt-description;
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: 0;
    }

    &:focus-visible {
      border: 1px solid $gray-light;
    }
  }
}
</style>
