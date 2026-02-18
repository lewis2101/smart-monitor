<script setup lang="ts">
import ServicesMenu from "./sevices-menu.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <services-menu />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
