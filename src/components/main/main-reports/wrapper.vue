<script setup lang="ts">
import MainReports from "@/components/main/main-reports/main-reports.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <main-reports />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
