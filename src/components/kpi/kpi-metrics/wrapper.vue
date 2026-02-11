<script setup lang="ts">
import KpiMetrics from "@/components/kpi/kpi-metrics/kpi-metrics.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <kpi-metrics />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
