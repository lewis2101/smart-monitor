<script setup lang="ts">
import MainExpress from "@/components/main/main-express/main-express.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-express />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
