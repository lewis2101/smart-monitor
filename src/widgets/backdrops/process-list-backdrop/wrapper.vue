<script setup lang="ts">
import ProcessListBackdrop from "@/widgets/backdrops/process-list-backdrop/process-list-backdrop.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <process-list-backdrop v-bind="$attrs" />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
