<script setup lang="ts">
import TransitionSuspense from "@/components/transition-suspense.vue";
import MonitoringSegment from "@/widgets/gps-monitoring/gps-monitoring-segments/monitoring-segment/monitoring-segment.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <TransitionSuspense>
    <monitoring-segment />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
