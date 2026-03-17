<script setup lang="ts">
import KpiMetrics from "@/components/kpi/kpi-metrics/kpi-metrics.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <kpi-metrics />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
