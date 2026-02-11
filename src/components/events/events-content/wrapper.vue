<script setup lang="ts">
import EventsContent from "@/components/events/events-content/events-content.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <events-content />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
