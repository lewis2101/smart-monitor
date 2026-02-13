<script setup lang="ts">
import BriefingMaterials from "@/components/briefing/briefing-materials/briefing-materials.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <briefing-materials />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
