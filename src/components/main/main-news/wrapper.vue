<script setup lang="ts">
import MainNews from "@/components/main/main-news/main-news.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-news />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
