<script setup lang="ts">
import MainReports from "@/components/main/main-reports/main-reports.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-reports />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
