<script setup lang="ts">
import TransitionSuspense from "@/components/transition-suspense.vue";
import AiChatList from "@/widgets/ai-chat-list/ai-chat-list.vue";
import Skeleton from "./skeleton.vue";
</script>

<template>
  <TransitionSuspense>
    <ai-chat-list />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
