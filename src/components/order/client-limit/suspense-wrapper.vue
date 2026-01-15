<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
import Skeleton from "./skeleton.vue";
import ClientLimit from "@/components/order/client-limit/client-limit.vue";

defineProps<{
  processKey: string;
}>();
</script>

<template>
  <error-boundary>
    <suspense>
      <client-limit :process-key="processKey" />

      <template #fallback>
        <skeleton />
      </template>
    </suspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
