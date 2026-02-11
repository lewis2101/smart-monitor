<script setup lang="ts">
import KpiFeats from "@/components/kpi/kpi-feats/kpi-feats.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <kpi-feats />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
