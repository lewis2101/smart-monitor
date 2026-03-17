<script setup lang="ts">
import MainExpress from "@/components/main/main-express/main-express.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <main-express />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
