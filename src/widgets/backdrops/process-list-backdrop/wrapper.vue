<script setup lang="ts">
import ProcessListBackdrop from "@/widgets/backdrops/process-list-backdrop/process-list-backdrop.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <process-list-backdrop v-bind="$attrs" />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
