<script setup lang="ts">
import BriefingScore from "@/components/briefing/briefing-score/briefing-score.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <briefing-score />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
