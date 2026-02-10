<script setup lang="ts">
import MainMenuBlock from "@/components/main/main-menu-block/main-menu-block.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <main-menu-block />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
