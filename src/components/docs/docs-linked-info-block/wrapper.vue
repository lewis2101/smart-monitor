<script setup lang="ts">
import DocsLinkedInfoBlock from "@/components/docs/docs-linked-info-block/docs-linked-info-block.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <docs-linked-info-block />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
