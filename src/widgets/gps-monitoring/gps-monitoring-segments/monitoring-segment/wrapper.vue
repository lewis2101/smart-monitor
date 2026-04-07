<script setup lang="ts">
import TransitionSuspense from "@/components/transition-suspense.vue";
import MonitoringSegment from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment/monitoring-segment.vue";
import Skeleton from "./skeleton.vue";
import ErrorBoundary from "@/components/error-boundary.vue";
import ErrorBlock from "@/components/error-block.vue";
</script>

<template>
  <error-boundary>
    <TransitionSuspense>
      <monitoring-segment v-bind="$attrs" />

      <template #fallback>
        <skeleton />
      </template>
    </TransitionSuspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
