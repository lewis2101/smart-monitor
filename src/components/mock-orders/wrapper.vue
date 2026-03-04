<script setup lang="ts">
import { computed, markRaw } from "vue";
import Skeleton from "./skeleton.vue";
import MockOrderStep1 from "@/components/mock-orders/mock-order-step-1.vue";
import MockOrderStep2 from "@/components/mock-orders/mock-order-step-2.vue";

const props = defineProps<{
  orderStep: string;
  orderId: string;
}>();

const mockOrderStepMap = {
  1: markRaw(MockOrderStep1),
  2: markRaw(MockOrderStep2),
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const currentMockOrderComponent = computed(() => mockOrderStepMap[props.orderStep]);
</script>

<template>
  <Suspense>
    <component v-bind="{ ...$attrs, ...$props }" :is="currentMockOrderComponent" />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style lang="scss" scoped></style>
