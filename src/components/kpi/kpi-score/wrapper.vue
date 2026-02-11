<script setup lang="ts">
import KpiScore from "@/components/kpi/kpi-score/kpi-score.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <kpi-score />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
