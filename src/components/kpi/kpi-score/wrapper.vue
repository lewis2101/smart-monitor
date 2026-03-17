<script setup lang="ts">
import KpiScore from "@/components/kpi/kpi-score/kpi-score.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <kpi-score />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
