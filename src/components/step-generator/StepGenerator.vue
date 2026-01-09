<script setup lang="ts">
import {type Component} from "vue";
import type {StepField} from "@/components/step-generator/types.ts";
import {useStepGenerator} from "@/composables/order/useStepGenerator.ts";

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

const {fieldsModel, fieldsMap} = useStepGenerator(props.processKey);

defineExpose({fieldsModel});
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
