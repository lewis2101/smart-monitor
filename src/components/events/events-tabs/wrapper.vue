<script setup lang="ts">
import EventsTabs from "@/components/events/events-tabs/events-tabs.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <events-tabs />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
