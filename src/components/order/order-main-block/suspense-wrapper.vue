<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import OrderMainBlock from "@/components/order/order-main-block/order-main-block.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";

defineProps<{
  orderId: string;
}>();

defineEmits<{
  (e: "getLabel", value: string): void;
}>();
</script>

<template>
  <error-boundary>
    <TransitionSuspense>
      <order-main-block :order-id="orderId" @get-label="(value) => $emit('getLabel', value)" />

      <template #fallback> <skeleton /> </template>
    </TransitionSuspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
