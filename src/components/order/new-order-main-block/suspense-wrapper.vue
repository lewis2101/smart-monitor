<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import NewOrderMainBlock from "@/components/order/new-order-main-block/new-order-main-block.vue";
import Skeleton from "./skeleton.vue";

defineProps<{
  processKey: string;
}>();
</script>

<template>
  <error-boundary>
    <suspense>
      <new-order-main-block :process-key="processKey" />

      <template #fallback> <skeleton /> </template>
    </suspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
