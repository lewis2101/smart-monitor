<script setup lang="ts">
import BriefingTabs from "@/components/briefing/briefing-tabs/briefing-tabs.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <briefing-tabs />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
