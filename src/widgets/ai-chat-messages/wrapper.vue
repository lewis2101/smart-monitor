<script setup lang="ts">
import AiChatMessages from "@/widgets/ai-chat-messages/ai-chat-messages.vue";
import Skeleton from "./skeleton.vue";
import type { AiChatMessagesProps } from "@/widgets/ai-chat-messages/types.ts";

defineProps<AiChatMessagesProps>();
</script>

<template>
  <Suspense>
    <ai-chat-messages v-bind="{ ...$attrs, ...$props }" />

    <template #fallback>
      <skeleton />
    </template>
  </Suspense>
</template>

<style scoped></style>
