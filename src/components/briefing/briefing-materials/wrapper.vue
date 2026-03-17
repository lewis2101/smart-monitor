<script setup lang="ts">
import BriefingMaterials from "@/components/briefing/briefing-materials/briefing-materials.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <briefing-materials />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
