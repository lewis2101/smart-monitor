<script setup lang="ts">
import LearningCourses from "@/components/learning/learning-courses/learning-courses.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <learning-courses />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
