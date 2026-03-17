<script setup lang="ts">
import AiChatMessages from "@/widgets/ai-chat-messages/ai-chat-messages.vue";
import Skeleton from "./skeleton.vue";
import type { AiChatMessagesProps } from "@/widgets/ai-chat-messages/types.ts";
import TransitionSuspense from "@/components/transition-suspense.vue";

defineProps<AiChatMessagesProps>();
</script>

<template>
  <TransitionSuspense>
    <ai-chat-messages v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </TransitionSuspense>
</template>

<style scoped></style>
