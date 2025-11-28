<script setup lang="ts">
import ApplicationOrdersBlock from "@/components/application/application-orders-block/application-orders-block.vue";
import Skeleton from "./skeleton.vue";
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
</script>

<template>
  <error-boundary>
    <suspense>
      <application-orders-block />
      <template #fallback>
        <skeleton />
      </template>
    </suspense>
    <template #error="{ error, clearError }">
      <error-block :error-text="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
