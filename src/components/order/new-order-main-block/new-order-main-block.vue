<script setup lang="ts">
import { useOrderInitialMutation } from "@/api/orders/get-initial-order.ts";
import StepGenerator from "@/components/step-generator/StepGenerator.vue";

const props = defineProps<{
  processKey: string;
}>();

const emit = defineEmits<{
  (e: "getLabel", value: string): void;
}>();

const { mutateAsync: orderInitialMutate } = useOrderInitialMutation({});

const orderData = await orderInitialMutate({
  processKey: props.processKey,
});

emit("getLabel", orderData.name);
</script>

<template>
  <div class="new-order-main-block">
    <div class="new-order-main-block__fields">
      <step-generator ref="stepGeneratorRef" :fields="orderData.attributes" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.new-order-main-block {
  width: 100%;

  &__fields {
    margin-bottom: 16px;
  }
}
</style>
