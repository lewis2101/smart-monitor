<script setup lang="ts">
import BriefingTabs from "@/components/briefing/briefing-tabs/briefing-tabs.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <briefing-tabs />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
