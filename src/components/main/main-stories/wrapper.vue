<script setup lang="ts">
import MainStories from "@/components/main/main-stories/main-stories.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-stories />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
