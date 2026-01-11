<script setup lang="ts">
import {type Component} from "vue";
import type {StepField} from "@/components/step-generator/types.ts";
import {useStepGenerator} from "@/composables/order/use-step-generator.ts";

const props = withDefaults(
  defineProps<{
    fields: StepField[];
    disabled?: boolean;
    processKey: string;
  }>(),
  {
    disabled: false,
  },
);

const {
  fieldsMap,
  fieldsModel,
  restrictions,
  restrictionsLoading,
  calcAffectedFieldsRestriction
} = useStepGenerator(props.processKey, props.fields);

const isValidField = (field: StepField) => !field.virtual;

defineExpose({fieldsModel});
</script>

<template>
  <div class="step-generator">
    <template
      v-for="field in fields"
      :key="field.value"
    >
      <component
        v-if="isValidField(field)"
        :is="fieldsMap[field.clientType]"
        v-model="fieldsModel[field.value]"
        :disabled="disabled"
        class="step-generator__field"
        :field="field"
        :restriction="restrictions[field.value]"
        :loading="restrictionsLoading[field.value]"
        @change="calcAffectedFieldsRestriction(field.value)"
      />
    </template>
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
