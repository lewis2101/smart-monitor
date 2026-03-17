<script setup lang="ts">
import AiAssistantButton from "@/widgets/ai-assistant-button/ai-assistant-button.vue";
import Skeleton from "./skeleton.vue";
import TransitionSuspense from "@/components/transition-suspense.vue";
</script>

<template>
  <TransitionSuspense>
    <ai-assistant-button />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
