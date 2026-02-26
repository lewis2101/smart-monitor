<script setup lang="ts">
import AiAssistantButton from "@/widgets/ai-assistant-button/ai-assistant-button.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <ai-assistant-button />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
