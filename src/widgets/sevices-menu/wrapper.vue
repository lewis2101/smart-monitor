<script setup lang="ts">
import ServicesMenu from "./sevices-menu.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <services-menu />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
