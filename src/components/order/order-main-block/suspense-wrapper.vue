<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import OrderMainBlock from "@/components/order/order-main-block/order-main-block.vue";
import Skeleton from "./skeleton.vue";

defineProps<{
  orderId: string;
}>();
</script>

<template>
  <error-boundary>
    <suspense>
      <order-main-block :order-id="orderId" />

      <template #fallback> <skeleton /> </template>
    </suspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
