<script setup lang="ts">
import LearningScore from "@/components/learning/learning-score/learning-score.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <learning-score />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
