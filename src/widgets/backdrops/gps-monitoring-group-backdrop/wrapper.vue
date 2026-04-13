<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
import GpsMonitoringGroupBackdrop from "@/widgets/backdrops/gps-monitoring-group-backdrop/gps-monitoring-group-backdrop.vue";
import Skeleton from "./skeleton.vue";
import ErrorBlock from "@/components/error-block.vue";
</script>

<template>
  <ErrorBoundary>
    <TransitionSuspense>
      <gps-monitoring-group-backdrop v-bind="$attrs" />

      <template #fallback>
        <skeleton />
      </template>
    </TransitionSuspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </ErrorBoundary>
</template>

<style scoped></style>
