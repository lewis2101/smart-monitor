<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-docs-block />

    <template #fallback> <skeleton /> </template>
  </Suspense>
</template>

<style scoped></style>
