<script setup lang="ts">
import type { FieldInputType } from "../../../types/FieldType.ts";
import { type Component, markRaw, type Raw, reactive } from "vue";
import FieldRef from "@/components/step-generator/FieldRef/FieldRef.vue";
import FieldInput from "@/components/step-generator/Fieldinput/FieldInput.vue";
import LinkGenerator from "@/components/step-generator/LinkGenerator/LinkGenerator.vue";
import DateTimeField from "@/components/step-generator/DateTimeField/DateTimeField.vue";
import AddressSelector from "@/components/step-generator/AddressSelector/AddressSelector.vue";
import type { StepField } from "@/components/step-generator/types.ts";
import RatingField from "@/components/step-generator/RatingField/RatingField.vue";
import FieldText from "@/components/step-generator/FieldText/FieldText.vue";
import FieldBoolean from "@/components/step-generator/FieldInput/FieldBoolean.vue";

withDefaults(
  defineProps<{
    fields: StepField[];
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const fieldsModel = reactive<Record<string, unknown>>({});

const fieldsMap: Record<FieldInputType, Raw<Component> | null> = {
  REF: markRaw(FieldRef),
  LINK_GENERATOR: markRaw(LinkGenerator),
  DATE_TIME: markRaw(DateTimeField),
  DATE: markRaw(DateTimeField),
  AddressSelector: markRaw(AddressSelector),
  STRING: markRaw(FieldInput),
  BOOLEAN: markRaw(FieldBoolean),
  INTEGER: null,
  ARRAY: null,
  LOCAL: null,
  NUMBER: null,
  TEXT: markRaw(FieldText),
  RATING: markRaw(RatingField),
};

defineExpose({ fieldsModel });
</script>

<template>
  <div class="step-generator">
    <component
      v-for="field in fields"
      :key="field.value"
      :is="fieldsMap[field.clientType]"
      v-model="fieldsModel[field.value]"
      :disabled="disabled"
      class="step-generator__field"
      :field="field"
    />
  </div>
</template>

<style scoped lang="scss">
.step-generator {
  &__field {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
