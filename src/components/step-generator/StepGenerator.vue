<script setup lang="ts">
import type { StepField } from "@/components/step-generator/types.ts";
import { useStepGenerator } from "@/composables/order/use-step-generator.ts";

const props = withDefaults(
  defineProps<{
    fields: StepField[];
    disabled?: boolean;
    processKey: string;
    orderId?: string;
  }>(),
  {
    disabled: false,
  },
);

const { fieldsMap, fieldsModel, restrictions, restrictionsLoading, handleChangeField, getPayloadOfFields } =
  useStepGenerator(props.processKey, props.fields, props.disabled);

defineExpose({ fieldsModel, getPayloadOfFields });
</script>

<template>
  <div class="step-generator">
    <template v-for="field in fields" :key="field.value">
      <component
        v-if="field.show"
        :is="fieldsMap[field.clientType]"
        v-model="fieldsModel[field.value]"
        :field="field"
        :step-model="fieldsModel"
        :process-key="processKey"
        :restriction="restrictions[field.value]"
        :loading="restrictionsLoading[field.value]"
        :disabled="disabled"
        :order-id="orderId"
        class="step-generator__field"
        @change="handleChangeField(field.value)"
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
