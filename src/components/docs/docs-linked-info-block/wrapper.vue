<script setup lang="ts">
import DocsLinkedInfoBlock from "@/components/docs/docs-linked-info-block/docs-linked-info-block.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <docs-linked-info-block />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
