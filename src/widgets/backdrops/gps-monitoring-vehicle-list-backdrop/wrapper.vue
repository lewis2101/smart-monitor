<script setup lang="ts">
import ErrorBoundary from "@/components/error-boundary.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
import GpsMonitoringVehicleListBackdrop from "@/widgets/backdrops/gps-monitoring-vehicle-list-backdrop/gps-monitoring-vehicle-list-backdrop.vue";
import Skeleton from "./skeleton.vue";
import ErrorBlock from "@/components/error-block.vue";
import type { GpsMonitoringVehicleListBackdropProps } from "@/widgets/backdrops/gps-monitoring-vehicle-list-backdrop/types.ts";

defineProps<GpsMonitoringVehicleListBackdropProps>();
</script>

<template>
  <error-boundary>
    <transition-suspense>
      <gps-monitoring-vehicle-list-backdrop v-bind="{ ...$attrs, ...$props }" />

      <template #fallback>
        <skeleton />
      </template>
    </transition-suspense>

    <template #error="{ error, clearError }">
      <error-block :error="error" @refresh="clearError" />
    </template>
  </error-boundary>
</template>

<style scoped></style>
