<script setup lang="ts">
import AiChatMessages from "@/widgets/ai-chat-messages/ai-chat-messages.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <Suspense>
    <ai-chat-messages />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
