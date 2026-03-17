<script setup lang="ts">
import MainDocsBlock from "@/components/main/main-docs-block/main-docs-block.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <main-docs-block />

    <template #fallback> <skeleton /> </template>
  </TransitionSuspense>
</template>

<style scoped></style>
